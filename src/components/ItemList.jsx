import { Link } from "react-router-dom";
import ItemTable from "./ItemTable";

const CATEGORY_ORDER = ["Electronics", "Clothing", "Books", "Food", "Other"];

const SkeletonBlock = ({ className }) => (
  <div className={`relative overflow-hidden rounded-xl bg-slate-200/80 ${className}`}>
    <span className="absolute inset-y-0 left-0 w-1/2 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent shimmer" />
  </div>
);

const ItemList = ({ items, onDelete, isLoading, hasFilters = false, onClearFilters }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/85 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5">
            <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/80 px-5 py-4 sm:px-6">
              <SkeletonBlock className="h-11 w-11 rounded-2xl" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-36" />
                <SkeletonBlock className="h-3 w-24" />
              </div>
              <SkeletonBlock className="hidden h-8 w-32 sm:block" />
            </div>
            <div className="divide-y divide-slate-100">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="grid gap-4 px-5 py-4 sm:grid-cols-[auto_1fr_auto_auto] sm:items-center sm:px-6">
                  <div className="flex items-center gap-3">
                    <SkeletonBlock className="h-10 w-10 rounded-2xl" />
                    <div className="space-y-2">
                      <SkeletonBlock className="h-4 w-36" />
                      <SkeletonBlock className="h-3 w-48 max-w-full" />
                    </div>
                  </div>
                  <SkeletonBlock className="hidden h-4 w-full sm:block" />
                  <SkeletonBlock className="h-7 w-24" />
                  <SkeletonBlock className="h-8 w-28" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="relative overflow-hidden rounded-[2rem] border border-dashed border-slate-300 bg-white/90 px-6 py-16 text-center shadow-xl shadow-slate-200/50 ring-1 ring-slate-900/5 backdrop-blur sm:px-10 sm:py-20">
        <div className="absolute left-1/2 top-0 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-200/40 blur-3xl" />
        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-xl shadow-indigo-500/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-9 w-9"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="relative mt-6 text-2xl font-black tracking-tight text-slate-950">
          {hasFilters ? "No matching items" : "Your inventory is ready for its first item"}
        </h3>
        <p className="relative mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
          {hasFilters
            ? "Try adjusting your search terms or category filters to reveal more results."
            : "Create a product record to unlock analytics, category tables, and stock status tracking."}
        </p>
        <div className="relative mt-7 flex justify-center">
          {hasFilters ? (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-50"
            >
              Clear filters
            </button>
          ) : (
            <Link
              to="/create"
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
              Add your first item
            </Link>
          )}
        </div>
      </div>
    );
  }

  const grouped = items.reduce((acc, item) => {
    const cat = item.category || "Other";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {});

  const sortedCategories = Object.keys(grouped).sort((a, b) => {
    const ai = CATEGORY_ORDER.indexOf(a);
    const bi = CATEGORY_ORDER.indexOf(b);
    if (ai === -1 && bi === -1) return a.localeCompare(b);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });

  return (
    <div className="space-y-6">
      {sortedCategories.map((category) => (
        <ItemTable
          key={category}
          category={category}
          items={grouped[category]}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ItemList;
