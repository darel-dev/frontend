import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { itemAPI } from "../api/axios";
import { formatCfa } from "../utils/currency";

const categoryStyles = {
  Electronics: {
    badge: "bg-blue-50 text-blue-700 ring-blue-200",
    accent: "from-blue-500 to-indigo-500",
    emoji: "💻",
  },
  Clothing: {
    badge: "bg-pink-50 text-pink-700 ring-pink-200",
    accent: "from-pink-500 to-rose-500",
    emoji: "👕",
  },
  Books: {
    badge: "bg-amber-50 text-amber-700 ring-amber-200",
    accent: "from-amber-500 to-orange-500",
    emoji: "📚",
  },
  Food: {
    badge: "bg-emerald-50 text-emerald-700 ring-emerald-200",
    accent: "from-emerald-500 to-teal-500",
    emoji: "🍎",
  },
  Other: {
    badge: "bg-slate-50 text-slate-700 ring-slate-200",
    accent: "from-slate-500 to-gray-600",
    emoji: "📦",
  },
};

const formatDate = (date) => {
  if (!date) return "Not available";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
      <div className="mx-auto max-w-5xl animate-pulse">
        <div className="mb-6 h-5 w-36 rounded bg-slate-200" />
        <div className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl shadow-slate-200/70 ring-1 ring-slate-900/5">
          <div className="h-56 bg-slate-200" />
          <div className="grid gap-6 p-6 sm:p-8 lg:grid-cols-[1fr_20rem]">
            <div className="space-y-5">
              <div className="h-8 w-1/2 rounded bg-slate-200" />
              <div className="h-28 rounded-2xl bg-slate-200" />
            </div>
            <div className="h-72 rounded-2xl bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return null;
  }

  const category = categoryStyles[item.category] || categoryStyles.Other;

  return (
    <div className="mx-auto max-w-5xl">
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <Link to="/" className="font-bold text-slate-500 transition-colors hover:text-indigo-600">
          Dashboard
        </Link>
        <span className="text-slate-300">/</span>
        <span className="font-bold text-slate-950">View Item</span>
      </nav>

      <article className="overflow-hidden rounded-[2rem] border border-white/70 bg-white/90 shadow-2xl shadow-slate-200/70 ring-1 ring-slate-900/5 backdrop-blur">
        <header className="relative overflow-hidden px-6 py-8 text-white sm:px-8 sm:py-10">
          <div className={`absolute inset-0 bg-gradient-to-br ${category.accent}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.34),_transparent_34%),linear-gradient(120deg,_rgba(15,23,42,0.18),_transparent_55%)]" />
          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-white/20 text-4xl shadow-xl ring-1 ring-white/25 backdrop-blur">
                {category.emoji}
              </div>
              <div>
                <p className="mb-2 text-sm font-black uppercase tracking-[0.22em] text-white/80">Product details</p>
                <h1 className="max-w-2xl text-3xl font-black tracking-tight sm:text-5xl">
                  {item.name}
                </h1>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="inline-flex rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-white ring-1 ring-white/20 backdrop-blur">
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-black text-white ring-1 ring-white/20 backdrop-blur">
                    <span className={`h-2 w-2 rounded-full ${item.inStock ? "bg-emerald-300" : "bg-rose-300"}`} />
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-white/15 p-5 shadow-xl ring-1 ring-white/20 backdrop-blur lg:min-w-72">
              <p className="text-sm font-bold text-white/75">Current price</p>
              <p className="mt-2 text-3xl font-black tracking-tight">{formatCfa(item.price)}</p>
            </div>
          </div>
        </header>

        <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="space-y-6">
            <section className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-500">
                Description
              </h2>
              <p className="mt-3 whitespace-pre-wrap text-base leading-8 text-slate-700">
                {item.description}
              </p>
            </section>

            <section className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Category</p>
                <span className={`mt-3 inline-flex rounded-full px-3 py-1.5 text-sm font-black ring-1 ring-inset ${category.badge}`}>
                  {category.emoji} {item.category}
                </span>
              </div>
              <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50/80 p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Last updated</p>
                <p className="mt-3 text-base font-black text-slate-950">
                  {formatDate(item.updatedAt)}
                </p>
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[1.5rem] border border-slate-200 bg-slate-950 p-5 text-white shadow-xl shadow-slate-950/10">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Quick actions</p>
              <div className="mt-5 grid gap-3">
                <Link
                  to={`/edit/${item._id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                  </svg>
                  Edit Item
                </Link>
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white transition hover:bg-white/15"
                >
                  Back to Dashboard
                </Link>
              </div>
            </div>

            <div className="rounded-[1.5rem] border border-slate-200 bg-white p-5 shadow-sm">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Record health</p>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <span className="text-sm font-bold text-slate-500">Name</span>
                  <span className="text-sm font-black text-emerald-600">Complete</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <span className="text-sm font-bold text-slate-500">Price</span>
                  <span className="text-sm font-black text-emerald-600">Set</span>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-3">
                  <span className="text-sm font-bold text-slate-500">Status</span>
                  <span className={`text-sm font-black ${item.inStock ? "text-emerald-600" : "text-rose-600"}`}>
                    {item.inStock ? "Available" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>
    </div>
  );
};

export default ViewItem;
