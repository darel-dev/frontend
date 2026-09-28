import { Link } from "react-router-dom";
import { formatCfa } from "../utils/currency";

const categoryStyles = {
  Electronics: {
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    accent: "from-blue-500 to-indigo-500",
    soft: "bg-blue-50 text-blue-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M13 7H7v6h6V7z" />
        <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h4V3a1 1 0 112 0v1h1a2 2 0 012 2v1h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a2 2 0 01-2 2h-1v1a1 1 0 11-2 0v-1H8v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-1H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V6a2 2 0 012-2h1V3a1 1 0 011-1zm8 4H5v8h10V6z" clipRule="evenodd" />
      </svg>
    ),
  },
  Clothing: {
    badge: "bg-pink-50 text-pink-700 ring-pink-200",
    accent: "from-pink-500 to-rose-500",
    soft: "bg-pink-50 text-pink-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M7 2a1 1 0 00-.707.293L3.586 5H3a2 2 0 00-2 2v2a1 1 0 001 1h2v6a2 2 0 002 2h8a2 2 0 002-2v-6h2a1 1 0 001-1V7a2 2 0 00-2-2h-.586l-2.707-2.707A1 1 0 0013 2h-1a2 2 0 11-4 0H7z" />
      </svg>
    ),
  },
  Books: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    accent: "from-amber-500 to-orange-500",
    soft: "bg-amber-50 text-amber-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
      </svg>
    ),
  },
  Food: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    accent: "from-emerald-500 to-teal-500",
    soft: "bg-emerald-50 text-emerald-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M6 3a1 1 0 011-1h.01a1 1 0 010 2H7a1 1 0 01-1-1zm2 3a1 1 0 00-2 0v1a2 2 0 00-2 2v1a2 2 0 00-2 2v.5a.5.5 0 00.5.5H6a1 1 0 011 1v1.5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V14a1 1 0 011-1h2.5a.5.5 0 00.5-.5V12a2 2 0 00-2-2V9a2 2 0 00-2-2V6a1 1 0 00-1-1H8zm5 1.5V6a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5v1.5h2zM4 13h2v1H4v-1zm10 0h2v1h-2v-1z" clipRule="evenodd" />
      </svg>
    ),
  },
  Other: {
    badge: "bg-slate-50 text-slate-700 ring-slate-200",
    accent: "from-slate-500 to-gray-600",
    soft: "bg-slate-50 text-slate-700",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
      </svg>
    ),
  },
};

const formatDate = (date) => {
  if (!date) return "Not updated";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const ItemTable = ({ category, items, onDelete }) => {
  const style = categoryStyles[category] || categoryStyles.Other;
  const totalValue = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const inStockCount = items.filter((item) => item.inStock).length;

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/95 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5 backdrop-blur transition duration-300 hover:shadow-2xl hover:shadow-slate-300/60">
      <header className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white px-5 py-5 sm:px-6">
        <div className={`absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-10 rounded-full bg-gradient-to-br opacity-15 blur-2xl ${style.accent}`} />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg shadow-slate-900/10 ${style.accent}`}>
              {style.icon}
            </span>
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-950">
                {category}
              </h2>
              <p className="text-sm font-medium text-slate-500">
                {items.length} {items.length === 1 ? "item" : "items"} • {inStockCount} in stock
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold ring-1 ring-inset ${style.badge}`}>
              Total {formatCfa(totalValue)}
            </span>
            <span className="inline-flex items-center rounded-full bg-white px-3 py-1.5 text-xs font-bold text-slate-600 ring-1 ring-slate-200">
              {items.length ? Math.round((inStockCount / items.length) * 100) : 0}% available
            </span>
          </div>
        </div>
      </header>

      <div className="divide-y divide-slate-100 md:hidden">
        {items.map((item) => (
          <article key={item._id} className="p-5">
            <div className="flex items-start gap-3">
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-base font-black text-white shadow-lg shadow-slate-900/10 ${style.accent}`}>
                {item.name?.charAt(0)?.toUpperCase() || "?"}
              </div>
              <div className="min-w-0 flex-1">
                <Link
                  to={`/view/${item._id}`}
                  className="block truncate text-base font-black text-slate-950 transition hover:text-indigo-700"
                >
                  {item.name}
                </Link>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-500">
                  {item.description || "No description available."}
                </p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Price</p>
                <p className="mt-1 font-black text-slate-950">{formatCfa(item.price)}</p>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</p>
                <span
                  className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
                    item.inStock
                      ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                      : "bg-rose-50 text-rose-700 ring-rose-200"
                  }`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${item.inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
                  {item.inStock ? "In Stock" : "Out"}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
              <p className="text-xs font-medium text-slate-400">Updated {formatDate(item.updatedAt)}</p>
              <div className="flex items-center gap-2">
                <Link
                  to={`/view/${item._id}`}
                  className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-xs font-bold text-sky-700 transition hover:bg-sky-100"
                >
                  View
                </Link>
                <Link
                  to={`/edit/${item._id}`}
                  className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-700 transition hover:bg-indigo-100"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={() => onDelete(item)}
                  className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700 transition hover:bg-rose-100"
                >
                  Delete
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="bg-slate-50/80">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Item
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            {items.map((item) => (
              <tr key={item._id} className="group transition-colors hover:bg-indigo-50/40">
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-black text-white shadow-sm ${style.accent}`}>
                      {item.name?.charAt(0)?.toUpperCase() || "?"}
                    </div>
                    <div className="min-w-0">
                      <Link
                        to={`/view/${item._id}`}
                        className="block max-w-[14rem] truncate text-sm font-black text-slate-950 transition hover:text-indigo-700 group-hover:text-indigo-700"
                      >
                        {item.name}
                      </Link>
                      <p className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-[0.68rem] font-bold ${style.soft}`}>
                        {category}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="max-w-sm px-6 py-4 text-sm leading-6 text-slate-600">
                  <p className="line-clamp-2">{item.description || "No description available."}</p>
                  <p className="mt-1 text-xs font-medium text-slate-400">Updated {formatDate(item.updatedAt)}</p>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span className="text-sm font-black text-slate-950">
                    {formatCfa(item.price)}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
                      item.inStock
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                        : "bg-rose-50 text-rose-700 ring-rose-200"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${item.inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right">
                  <div className="inline-flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                    <Link
                      to={`/view/${item._id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold text-sky-700 transition hover:bg-sky-50"
                      title="View item"
                      aria-label={`View ${item.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M10 4.5C5.5 4.5 2.3 8.1 1.3 10c1 1.9 4.2 5.5 8.7 5.5s7.7-3.6 8.7-5.5C17.7 8.1 14.5 4.5 10 4.5zm0 9a3.5 3.5 0 110-7 3.5 3.5 0 010 7zm0-1.5a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                      View
                    </Link>
                    <Link
                      to={`/edit/${item._id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold text-indigo-700 transition hover:bg-indigo-50"
                      title="Edit item"
                      aria-label={`Edit ${item.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                      </svg>
                      Edit
                    </Link>
                    <button
                      type="button"
                      onClick={() => onDelete(item)}
                      className="inline-flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-bold text-rose-700 transition hover:bg-rose-50"
                      title="Delete item"
                      aria-label={`Delete ${item.name}`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Delete
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
