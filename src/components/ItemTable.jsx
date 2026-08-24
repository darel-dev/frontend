import { Link } from "react-router-dom";

const categoryStyles = {
  Electronics: {
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    accent: "from-blue-500 to-indigo-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
      </svg>
    ),
  },
  Clothing: {
    badge: "bg-pink-50 text-pink-700 ring-pink-200",
    accent: "from-pink-500 to-rose-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 6a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
      </svg>
    ),
  },
  Books: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    accent: "from-amber-500 to-orange-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
    ),
  },
  Food: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    accent: "from-emerald-500 to-green-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.5a.5.5 0 00.5.5H6a1 1 0 011 1v1.5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V14a1 1 0 011-1h2.5a.5.5 0 00.5-.5V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 00-1-1H8zm5 1.5V6a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1.5h2zM4 13h2v1H4v-1zm10 0h2v1h-2v-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  Other: {
    badge: "bg-slate-50 text-slate-700 ring-slate-200",
    accent: "from-slate-500 to-gray-500",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  },
};

const ItemTable = ({ category, items, onDelete }) => {
  const style = categoryStyles[category] || categoryStyles.Other;
  const totalValue = items.reduce((sum, it) => sum + (Number(it.price) || 0), 0);
  const inStockCount = items.filter((it) => it.inStock).length;

  const handleDelete = (item) => {
    if (window.confirm(`Are you sure you want to delete "${item.name}"?`)) {
      onDelete(item._id);
    }
  };

  return (
    <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <header className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <span className={`flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-white shadow-sm ${style.accent}`}>
            {style.icon}
          </span>
          <div>
            <h2 className="text-base font-semibold text-gray-900 sm:text-lg">
              {category}
            </h2>
            <p className="text-xs text-gray-500">
              {items.length} {items.length === 1 ? "item" : "items"} • {inStockCount} in stock
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${style.badge}`}>
            Total ${totalValue.toFixed(2)}
          </span>
        </div>
      </header>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50/60">
            <tr>
              <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Name
              </th>
              <th scope="col" className="hidden px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 md:table-cell sm:px-6">
                Description
              </th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Price
              </th>
              <th scope="col" className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Status
              </th>
              <th scope="col" className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-500 sm:px-6">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {items.map((item) => (
              <tr key={item._id} className="group transition-colors hover:bg-indigo-50/40">
                <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-sm font-semibold text-white shadow-sm ${style.accent}`}>
                      {item.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-gray-900 group-hover:text-indigo-700">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-500 md:hidden line-clamp-1">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="hidden max-w-xs px-5 py-4 text-sm text-gray-600 md:table-cell sm:px-6">
                  <p className="line-clamp-2">{item.description}</p>
                </td>
                <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                  <span className="text-sm font-semibold text-gray-900">
                    ${Number(item.price)?.toFixed(2)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${
                      item.inStock
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                        : "bg-rose-50 text-rose-700 ring-rose-200"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${item.inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-4 text-right sm:px-6">
                  <div className="inline-flex items-center gap-1">
                    <Link
                      to={`/edit/${item._id}`}
                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-indigo-600 transition-colors hover:bg-indigo-50"
                      title="Edit"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                      </svg>
                      <span className="hidden sm:inline">Edit</span>
                    </Link>
                    <button
                      onClick={() => handleDelete(item)}
                      className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-rose-600 transition-colors hover:bg-rose-50"
                      title="Delete"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      <span className="hidden sm:inline">Delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ItemTable;
