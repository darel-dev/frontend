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
      } catch {
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
        <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 border-b border-gray-100 bg-gray-50 px-6 py-6 sm:px-8">
            <div className="h-11 w-11 rounded-xl bg-gray-200"></div>
            <div className="flex-1 space-y-2">
              <div className="h-5 w-1/3 rounded bg-gray-200"></div>
              <div className="h-3 w-1/2 rounded bg-gray-200"></div>
            </div>
          </div>
          <div className="space-y-6 p-6 sm:p-8">
            <div className="h-11 rounded-xl bg-gray-200"></div>
            <div className="h-24 rounded-xl bg-gray-200"></div>
            <div className="grid grid-cols-2 gap-6">
              <div className="h-11 rounded-xl bg-gray-200"></div>
              <div className="h-11 rounded-xl bg-gray-200"></div>
            </div>
            <div className="h-12 rounded-xl bg-gray-200"></div>
            <div className="h-11 rounded-xl bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link to="/" className="flex items-center gap-1.5 text-gray-500 transition-colors hover:text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Items
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-medium text-gray-900">Edit Item</span>
      </nav>

      {/* Form Card */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 bg-gradient-to-r from-amber-50/60 via-white to-orange-50/40 px-6 py-6 sm:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-md shadow-amber-200">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">Edit Item</h1>
              <p className="mt-0.5 text-sm text-gray-500">
                Update the details for <span className="font-semibold text-gray-700">"{item?.name}"</span>
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6 sm:px-8">
          <ItemForm
            initialData={item}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            buttonText="Save Changes"
          />
        </div>
      </div>
    </div>
  );
};

export default EditItem;
