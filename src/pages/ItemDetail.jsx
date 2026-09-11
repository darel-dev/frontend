import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { itemAPI } from "../api/axios";

const ItemDetail = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        setHasError(false);
        const response = await itemAPI.getOne(id);
        const itemData = response.data?.data;

        if (!itemData) {
          setHasError(true);
          return;
        }

        setItem(itemData);
      } catch (error) {
        setHasError(true);
        toast.error(
          error.response?.data?.message || "Failed to fetch item details"
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl">
        <div className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-36 bg-gray-100" />
          <div className="space-y-5 p-6 sm:p-8">
            <div className="h-7 w-2/3 rounded bg-gray-200" />
            <div className="h-4 w-1/3 rounded bg-gray-200" />
            <div className="h-24 rounded-xl bg-gray-200" />
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="h-16 rounded-xl bg-gray-200" />
              <div className="h-16 rounded-xl bg-gray-200" />
              <div className="h-16 rounded-xl bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (hasError || !item) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-rose-50 text-rose-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10A8 8 0 112 10a8 8 0 0116 0zM9 5a1 1 0 012 0v4a1 1 0 11-2 0V5zm1 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-gray-900">Item not found</h1>
        <p className="mt-2 text-sm text-gray-500">
          This item may have been removed or is no longer available.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700"
        >
          Back to items
        </Link>
      </div>
    );
  }

  const updatedDate = item.updatedAt
    ? new Date(item.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <div className="mx-auto max-w-3xl">
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
        <span className="font-medium text-gray-900">View Item</span>
      </nav>

      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <header className="bg-gradient-to-r from-indigo-50 via-white to-purple-50 px-6 py-8 sm:px-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <span className="inline-flex rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                {item.category || "Other"}
              </span>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">{item.name}</h1>
              <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                item.inStock
                  ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                  : "bg-rose-50 text-rose-700 ring-rose-200"
              }`}>
                <span className={`h-1.5 w-1.5 rounded-full ${item.inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
                {item.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>
            <p className="text-3xl font-bold text-gray-900">${Number(item.price || 0).toFixed(2)}</p>
          </div>
        </header>

        <div className="space-y-6 px-6 py-7 sm:px-8">
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500">Description</h2>
            <p className="mt-2 whitespace-pre-wrap text-base leading-7 text-gray-700">{item.description}</p>
          </section>

          <dl className="grid gap-4 border-t border-gray-100 pt-6 sm:grid-cols-2">
            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Category</dt>
              <dd className="mt-1 text-sm font-semibold text-gray-900">{item.category || "Other"}</dd>
            </div>
            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">Availability</dt>
              <dd className="mt-1 text-sm font-semibold text-gray-900">{item.inStock ? "Available" : "Unavailable"}</dd>
            </div>
          </dl>

          <div className="flex flex-col-reverse justify-between gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:items-center">
            {updatedDate && <p className="text-xs text-gray-400">Updated {updatedDate}</p>}
            <div className="flex gap-3 sm:ml-auto">
              <Link to="/" className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50">
                Back to items
              </Link>
              <Link to={`/edit/${item._id}`} className="rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-700">
                Edit item
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ItemDetail;
