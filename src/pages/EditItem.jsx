import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { itemAPI } from "../api/axios";
import ItemForm from "../components/ItemForm";
import toast from "react-hot-toast";

const EditItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsFetching(true);
        const response = await itemAPI.getOne(id);
        setItem(response.data.data);
      } catch (error) {
        toast.error("Failed to fetch item details");
        navigate("/");
      } finally {
        setIsFetching(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      await itemAPI.update(id, formData);
      toast.success("Item updated successfully! ✅");
      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update item"
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-8">
          <div className="mb-4 h-8 w-1/2 rounded bg-gray-200"></div>
          <div className="mb-8 h-4 w-3/4 rounded bg-gray-200"></div>
          <div className="space-y-6">
            <div className="h-12 rounded-lg bg-gray-200"></div>
            <div className="h-24 rounded-lg bg-gray-200"></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-12 rounded-lg bg-gray-200"></div>
              <div className="h-12 rounded-lg bg-gray-200"></div>
            </div>
            <div className="h-12 rounded-lg bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

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
        <span className="text-gray-900 font-medium">Edit Item</span>
      </div>

      {/* Form Card */}
      <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Edit Item</h1>
          <p className="mt-2 text-sm text-gray-500">
            Update the details for <strong>"{item?.name}"</strong>
          </p>
        </div>

        <ItemForm
          initialData={item}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          buttonText="Update Item"
        />
      </div>
    </div>
  );
};

export default EditItem;