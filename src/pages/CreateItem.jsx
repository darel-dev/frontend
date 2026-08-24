import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { itemAPI } from "../api/axios";
import ItemForm from "../components/ItemForm";
import toast from "react-hot-toast";

const CreateItem = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      await itemAPI.create(formData);
      toast.success("Item created successfully! 🎉");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create item"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
        <Link to="/" className="hover:text-indigo-600 transition-colors">
          Items
        </Link>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
        <span className="text-gray-900 font-medium">Create New Item</span>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Create New Item</h1>
          <p className="mt-2 text-sm text-gray-500">
            Fill in the details below to add a new item to your inventory.
          </p>
        </div>

        <ItemForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          buttonText="Create Item"
        />
      </div>
    </div>
  );
};

export default CreateItem;