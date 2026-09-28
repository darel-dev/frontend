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
      toast.error(error.response?.data?.message || "Failed to create item");
    } finally {
      setIsLoading(false);
    }
  };

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
        <span className="font-bold text-slate-950">Create New Item</span>
      </nav>

      <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl shadow-slate-200/70 ring-1 ring-slate-900/5 backdrop-blur">
        <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-r from-indigo-50 via-white to-violet-50 px-6 py-7 sm:px-8">
          <div className="absolute -right-20 -top-24 h-52 w-52 rounded-full bg-indigo-300/30 blur-3xl" />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-500/20">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-600">New catalog entry</p>
                <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Create New Item</h1>
                <p className="mt-1 text-sm text-slate-500">
                  Add a polished product record to your inventory.
                </p>
              </div>
            </div>
            <span className="w-fit rounded-full bg-white/80 px-4 py-2 text-xs font-black text-slate-600 shadow-sm ring-1 ring-slate-200">
              Required fields marked *
            </span>
          </div>
        </div>

        <div className="px-5 py-6 sm:px-8 sm:py-8">
          <ItemForm
            onSubmit={handleSubmit}
            isLoading={isLoading}
            buttonText="Create Item"
          />
        </div>
      </div>
    </div>
  );
};

export default CreateItem;
