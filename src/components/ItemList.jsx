import ItemCard from "./ItemCard";

const ItemList = ({ items, onDelete, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl border border-gray-200 bg-white p-6"
          >
            <div className="mb-4 flex justify-between">
              <div className="h-6 w-3/4 rounded bg-gray-200"></div>
              <div className="h-6 w-16 rounded-full bg-gray-200"></div>
            </div>
            <div className="mb-2 h-4 w-1/3 rounded bg-gray-200"></div>
            <div className="mb-1 h-4 w-full rounded bg-gray-200"></div>
            <div className="mb-4 h-4 w-2/3 rounded bg-gray-200"></div>
            <div className="mb-4 h-8 w-1/4 rounded bg-gray-200"></div>
            <div className="flex gap-3">
              <div className="h-10 flex-1 rounded-lg bg-gray-200"></div>
              <div className="h-10 flex-1 rounded-lg bg-gray-200"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-white py-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="mb-4 h-16 w-16 text-gray-300"
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
        <h3 className="mb-2 text-lg font-semibold text-gray-900">
          No items found
        </h3>
        <p className="text-sm text-gray-500">
          Get started by creating your first item.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <ItemCard key={item._id} item={item} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default ItemList;