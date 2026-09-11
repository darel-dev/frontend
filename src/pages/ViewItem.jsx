import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { itemAPI } from "../api/axios";

const categoryStyles = {
  Electronics: "bg-blue-50 text-blue-700 ring-blue-200",
  Clothing: "bg-pink-50 text-pink-700 ring-pink-200",
  Books: "bg-amber-50 text-amber-700 ring-amber-200",
  Food: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Other: "bg-slate-50 text-slate-700 ring-slate-200",
};

const ViewItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setIsLoading(true);
        const response = await itemAPI.getOne(id);
        setItem(response.data.data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch item details");
        navigate("/");
      } finally {
        setIsLoading(false);
      }
    };

    fetchItem();
  }, [id, navigate]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl animate-pulse">
        <div className="mb-6 h-5 w-32 rounded bg-gray-200" />
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-32 bg-gray-100" />
          <div className="space-y-6 p-6 sm:p-8">
            <div className="h-8 w-1/2 rounded bg-gray-200" />
            <div className="h-20 rounded bg-gray-200" />
            <div className="grid grid-cols-2 gap-4">
              <div className="h-20 rounded bg-gray-200" />
              <div className="h-20 rounded bg-gray-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const categoryClass = categoryStyles[item.category] || categoryStyles.Other;

  return (
    <div className="mx-auto max-w-3xl">
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link to="/" className="text-gray-500 transition-colors hover:text-indigo-600">
          Items
        </Link>
        <span className="text-gray-300">/</span>
        <span className="font-medium text-gray-900">View Item</span>
      </nav>

      <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <header className="border-b border-gray-100 bg-gradient-to-r from-indigo-50/60 via-white to-purple-50/40 px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-xl font-bold text-white shadow-md shadow-indigo-200">
                {item.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div>
                <p className="mb-1 text-sm font-medium text-indigo-600">Product details</p>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                  {item.name}
                </h1>
                <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${categoryClass}`}>
                  {item.category}
                </span>
              </div>
            </div>
            <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium ring-1 ring-inset ${
              item.inStock
                ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                : "bg-rose-50 text-rose-700 ring-rose-200"
            }`}>
              <span className={`h-2 w-2 rounded-full ${item.inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
              {item.inStock ? "In Stock" : "Out of Stock"}
            </span>
          </div>
        </header>

        <div className="space-y-8 px-6 py-8 sm:px-8">
          <section>
            <h2 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Description
            </h2>
            <p className="whitespace-pre-wrap leading-relaxed text-gray-700">
              {item.description}
            </p>
          </section>

          <dl className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
              <dt className="text-sm font-medium text-gray-500">Price</dt>
              <dd className="mt-1 text-2xl font-bold text-gray-900">
                ${Number(item.price).toFixed(2)}
              </dd>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50/60 p-4">
              <dt className="text-sm font-medium text-gray-500">Last updated</dt>
              <dd className="mt-1 text-base font-semibold text-gray-900">
                {item.updatedAt
                  ? new Date(item.updatedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : "Not available"}
              </dd>
            </div>
          </dl>

          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 pt-6 sm:flex-row sm:justify-end">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Back to Items
            </Link>
            <Link
              to={`/edit/${item._id}`}
              className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all hover:from-indigo-600 hover:to-indigo-700"
            >
              Edit Item
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ViewItem;
