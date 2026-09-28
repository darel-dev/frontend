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
      toast.error(error.response?.data?.message || "Failed to update item");
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="mx-auto max-w-5xl">
        <div className="animate-pulse overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl shadow-slate-200/70 ring-1 ring-slate-900/5">
          <div className="flex items-center gap-4 border-b border-slate-100 bg-slate-50/80 px-6 py-7 sm:px-8">
            <div className="h-14 w-14 rounded-2xl bg-slate-200" />
            <div className="flex-1 space-y-3">
              <div className="h-4 w-36 rounded bg-slate-200" />
              <div className="h-7 w-1/3 rounded bg-slate-200" />
              <div className="h-4 w-1/2 rounded bg-slate-200" />
            </div>
          </div>
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
            <div className="space-y-6">
              <div className="h-64 rounded-[1.5rem] bg-slate-200" />
              <div className="h-72 rounded-[1.5rem] bg-slate-200" />
            </div>
            <div className="h-96 rounded-[1.5rem] bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl">
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link to="/" className="flex items-center gap-1.5 font-bold text-slate-500 transition-colors hover:text-indigo-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Dashboard
        </Link>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-bold text-slate-950">Edit Item</span>
      </nav>

      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl shadow-slate-200/70 ring-1 ring-slate-900/5 backdrop-blur">
        <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-r from-amber-50 via-white to-orange-50 px-6 py-7 sm:px-8">
          <div className="absolute -right-20 -top-24 h-52 w-52 rounded-full bg-amber-300/30 blur-3xl" />
          <div className="relative flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-xl shadow-amber-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-700">Catalog maintenance</p>
              <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Edit Item</h1>
              <p className="mt-1 text-sm text-slate-500">
                Update details for <span className="font-bold text-slate-700">“{item?.name}”</span>
              </p>
            </div>
          </div>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
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
