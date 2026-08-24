import { Link } from "react-router-dom";

const categoryColors = {
  Electronics: "bg-blue-100 text-blue-700",
  Clothing: "bg-pink-100 text-pink-700",
  Books: "bg-amber-100 text-amber-700",
  Food: "bg-green-100 text-green-700",
  Other: "bg-gray-100 text-gray-700",
};

const ItemCard = ({ item, onDelete }) => {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      onDelete(item._id);
    }
  };

  return (
    <div className="group rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-gray-300">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {item.name}
          </h3>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-medium ${
              categoryColors[item.category] || categoryColors.Other
            }`}
          >
            {item.category}
          </span>
        </div>
        <span
          className={`ml-2 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            item.inStock
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          <span
            className={`mr-1.5 h-2 w-2 rounded-full ${
              item.inStock ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          {item.inStock ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">
        {item.description}
      </p>

      {/* Price */}
      <div className="mb-5">
        <span className="text-2xl font-bold text-gray-900">
          ${item.price?.toFixed(2)}
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          to={`/edit/${item._id}`}
          className="flex-1 rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2.5 text-center text-sm font-medium text-indigo-600 transition-all duration-200 hover:bg-indigo-100 hover:border-indigo-300 active:scale-95"
        >
          <span className="inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
              <path
                fillRule="evenodd"
                d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                clipRule="evenodd"
              />
            </svg>
            Edit
          </span>
        </Link>
        <button
          onClick={handleDelete}
          className="flex-1 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition-all duration-200 hover:bg-red-100 hover:border-red-300 active:scale-95"
        >
          <span className="inline-flex items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Delete
          </span>
        </button>
      </div>

      {/* Timestamp */}
      <p className="mt-4 text-xs text-gray-400">
        Updated: {new Date(item.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </p>
    </div>
  );
};

export default ItemCard;