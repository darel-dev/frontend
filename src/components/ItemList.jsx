import ItemTable from "./ItemTable";

const CATEGORY_ORDER = ["Electronics", "Clothing", "Books", "Food", "Other"];

const ItemList = ({ items, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-5 py-4 sm:px-6">
              <div className="h-9 w-9 animate-pulse rounded-xl bg-gray-200"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
                <div className="h-3 w-20 animate-pulse rounded bg-gray-200"></div>
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {[...Array(3)].map((_, j) => (
                <div key={j} className="flex items-center gap-4 px-5 py-4 sm:px-6">
                  <div className="h-9 w-9 animate-pulse rounded-lg bg-gray-200"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 animate-pulse rounded bg-gray-200"></div>
                    <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200"></div>
                  </div>
                  <div className="h-6 w-16 animate-pulse rounded-full bg-gray-200"></div>
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
      <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white px-6 py-20">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
            />
          </svg>
        </div>
        <h3 className="mb-1 text-lg font-semibold text-gray-900">No items found</h3>
        <p className="text-sm text-gray-500">
          Get started by creating your first item.
        </p>
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
