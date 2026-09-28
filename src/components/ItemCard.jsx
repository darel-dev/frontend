import { Link } from "react-router-dom";
import { formatCfa } from "../utils/currency";

const categoryColors = {
  Electronics: "bg-blue-50 text-blue-700 ring-blue-200",
  Clothing: "bg-pink-50 text-pink-700 ring-pink-200",
  Books: "bg-amber-50 text-amber-700 ring-amber-200",
  Food: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  Other: "bg-slate-50 text-slate-700 ring-slate-200",
};

const ItemCard = ({ item, onDelete }) => {
  return (
    <article className="group relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/95 p-5 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/60">
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-300/20 blur-2xl transition group-hover:bg-indigo-300/30" />

      <div className="relative mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <Link
            to={`/view/${item._id}`}
            className="block truncate text-lg font-black tracking-tight text-slate-950 transition-colors hover:text-indigo-700"
          >
            {item.name}
          </Link>
          <span
            className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-bold ring-1 ring-inset ${
              categoryColors[item.category] || categoryColors.Other
            }`}
          >
            {item.category}
          </span>
        </div>
        <span
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${
            item.inStock
              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
              : "bg-rose-50 text-rose-700 ring-rose-200"
          }`}
        >
          <span className={`mr-1.5 h-2 w-2 rounded-full ${item.inStock ? "bg-emerald-500" : "bg-rose-500"}`} />
          {item.inStock ? "In Stock" : "Out"}
        </span>
      </div>

      <p className="relative mb-5 line-clamp-3 text-sm leading-6 text-slate-600">
        {item.description || "No description available."}
      </p>

      <div className="relative mb-5 rounded-2xl bg-slate-50 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Price</p>
        <p className="mt-1 text-2xl font-black text-slate-950">
          {formatCfa(item.price)}
        </p>
      </div>

      <div className="relative grid grid-cols-3 gap-2">
        <Link
          to={`/view/${item._id}`}
          className="rounded-xl border border-sky-200 bg-sky-50 px-3 py-2.5 text-center text-sm font-bold text-sky-700 transition hover:bg-sky-100 active:scale-95"
        >
          View
        </Link>
        <Link
          to={`/edit/${item._id}`}
          className="rounded-xl border border-indigo-200 bg-indigo-50 px-3 py-2.5 text-center text-sm font-bold text-indigo-700 transition hover:bg-indigo-100 active:scale-95"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => onDelete(item)}
          className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2.5 text-sm font-bold text-rose-700 transition hover:bg-rose-100 active:scale-95"
        >
          Delete
        </button>
      </div>

      <p className="relative mt-4 text-xs font-medium text-slate-400">
        Updated: {item.updatedAt ? new Date(item.updatedAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }) : "Not updated"}
      </p>
    </article>
  );
};

export default ItemCard;
