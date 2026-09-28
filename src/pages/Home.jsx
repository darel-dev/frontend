import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { itemAPI } from "../api/axios";
import ItemList from "../components/ItemList";
import toast from "react-hot-toast";
import { formatCfa } from "../utils/currency";
import InventoryAnalytics from "../components/InventoryAnalytics";
import ConfirmDialog from "../components/ConfirmDialog";

const CATEGORIES = ["All", "Electronics", "Clothing", "Books", "Food", "Other"];

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pendingDeleteItem, setPendingDeleteItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await itemAPI.getAll();
      setItems(response.data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch items");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchItems();
  }, [fetchItems]);

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const hasActiveFilters = Boolean(normalizedSearch) || filterCategory !== "All";

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const name = item.name || "";
      const description = item.description || "";
      const matchesSearch =
        !normalizedSearch ||
        name.toLowerCase().includes(normalizedSearch) ||
        description.toLowerCase().includes(normalizedSearch);
      const matchesCategory =
        filterCategory === "All" || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    });
  }, [filterCategory, items, normalizedSearch]);

  const stats = useMemo(() => {
    const total = items.length;
    const inStock = items.filter((item) => item.inStock).length;
    const outOfStock = total - inStock;
    const value = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
    const categories = new Set(items.map((item) => item.category || "Other")).size;
    const stockRate = total ? Math.round((inStock / total) * 100) : 0;

    return { total, inStock, outOfStock, value, categories, stockRate };
  }, [items]);

  const statCards = [
    {
      label: "Total Items",
      value: stats.total,
      helper: `${stats.categories} active ${stats.categories === 1 ? "category" : "categories"}`,
      accent: "from-indigo-500 to-blue-500",
      glow: "bg-indigo-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M4 3a2 2 0 00-2 2v2.5A1.5 1.5 0 003.5 9h13A1.5 1.5 0 0018 7.5V5a2 2 0 00-2-2H4zm-.5 8A1.5 1.5 0 002 12.5V15a2 2 0 002 2h12a2 2 0 002-2v-2.5a1.5 1.5 0 00-1.5-1.5h-13z" />
        </svg>
      ),
    },
    {
      label: "In Stock",
      value: stats.inStock,
      helper: `${stats.stockRate}% available now`,
      accent: "from-emerald-500 to-teal-500",
      glow: "bg-emerald-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: "Out of Stock",
      value: stats.outOfStock,
      helper: stats.outOfStock ? "Needs attention" : "Everything available",
      accent: "from-rose-500 to-pink-500",
      glow: "bg-rose-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: "Inventory Value",
      value: formatCfa(stats.value),
      helper: "Total catalog worth",
      accent: "from-amber-500 to-orange-500",
      glow: "bg-amber-400",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
        </svg>
      ),
    },
  ];

  const requestDelete = useCallback(
    (itemOrId) => {
      const item =
        typeof itemOrId === "string"
          ? items.find((entry) => entry._id === itemOrId)
          : itemOrId;
      setPendingDeleteItem(item || { _id: itemOrId, name: "this item" });
    },
    [items]
  );

  const handleDelete = async () => {
    if (!pendingDeleteItem) return;

    try {
      setIsDeleting(true);
      await itemAPI.delete(pendingDeleteItem._id);
      setItems((prev) => prev.filter((item) => item._id !== pendingDeleteItem._id));
      toast.success("Item deleted successfully! 🗑️");
      setPendingDeleteItem(null);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete item");
    } finally {
      setIsDeleting(false);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setFilterCategory("All");
  };

  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-2xl shadow-indigo-950/10 ring-1 ring-slate-900/5 backdrop-blur sm:p-8 lg:p-10">
        <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl" />
        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-cyan-200/35 blur-3xl" />
        <div className="relative grid gap-8 lg:grid-cols-[1.35fr_0.65fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.22em] text-indigo-700 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.16)]" />
              Live inventory workspace
            </div>
            <h1 className="max-w-3xl text-4xl font-black tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
              Manage products with a cleaner, faster control center.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Review stock levels, spot gaps, filter your catalog, and update items from a polished interface built entirely on the existing frontend.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/create"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-slate-900/20 transition hover:-translate-y-0.5 hover:bg-slate-800 active:translate-y-0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add new item
              </Link>
              <button
                type="button"
                onClick={fetchItems}
                disabled={isLoading}
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white/80 px-5 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-white active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                Refresh data
              </button>
            </div>
          </div>

          <div className="relative rounded-[1.75rem] border border-white/80 bg-slate-950 p-5 text-white shadow-2xl shadow-slate-950/20 ring-1 ring-white/10">
            <div className="absolute inset-0 rounded-[1.75rem] bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.7),_transparent_42%),radial-gradient(circle_at_bottom_left,_rgba(20,184,166,0.5),_transparent_38%)] opacity-80" />
            <div className="relative space-y-5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-indigo-100 ring-1 ring-white/15">
                  Snapshot
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  {filteredItems.length} visible
                </span>
              </div>
              <div>
                <p className="text-sm text-slate-300">Catalog value</p>
                <p className="mt-2 text-3xl font-black tracking-tight">
                  {formatCfa(stats.value)}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-2xl font-black">{stats.inStock}</p>
                  <p className="mt-1 text-xs font-medium text-slate-300">Ready to sell</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/10">
                  <p className="text-2xl font-black">{stats.outOfStock}</p>
                  <p className="mt-1 text-xs font-medium text-slate-300">Need restock</p>
                </div>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 transition-all duration-500"
                  style={{ width: `${stats.stockRate}%` }}
                />
              </div>
              <p className="text-xs leading-5 text-slate-300">
                {stats.stockRate}% of your tracked products are currently available.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="group relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-white/90 p-5 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5 backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-300/60"
          >
            <div className={`absolute -right-6 -top-8 h-24 w-24 rounded-full opacity-15 blur-2xl transition group-hover:opacity-25 ${stat.glow}`} />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">{stat.label}</p>
                <p className="mt-2 text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">{stat.value}</p>
                <p className="mt-2 text-sm font-medium text-slate-500">{stat.helper}</p>
              </div>
              <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg ${stat.accent}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </section>

      <InventoryAnalytics items={items} />

      <section className="rounded-[1.75rem] border border-white/70 bg-white/90 p-4 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5 backdrop-blur sm:p-5">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">Inventory browser</p>
            <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">Find and organize items</h2>
          </div>
          <p className="text-sm font-medium text-slate-500">
            Showing <span className="font-black text-slate-950">{filteredItems.length}</span> of {items.length} items
          </p>
        </div>

        <div className="grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              aria-label="Search products"
              placeholder="Search by name or description..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-11 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all placeholder:text-slate-400 focus:border-indigo-300 focus:ring-4 focus:ring-indigo-100"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear product search"
                className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={fetchItems}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-white active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            title="Refresh"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Refresh
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {CATEGORIES.map((category) => {
            const isActive = filterCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setFilterCategory(category)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-all ${
                  isActive
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-900/15"
                    : "border border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                }`}
              >
                {category === "All" ? "All items" : category}
              </button>
            );
          })}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-full border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
            >
              Clear filters
            </button>
          )}
        </div>
      </section>

      {hasActiveFilters && !isLoading && (
        <p className="rounded-2xl border border-indigo-100 bg-indigo-50/80 px-4 py-3 text-sm text-indigo-900 shadow-sm">
          Showing <span className="font-black">{filteredItems.length}</span> of {items.length} items
          {filterCategory !== "All" && (
            <> in <span className="font-black">{filterCategory}</span></>
          )}
          {normalizedSearch && (
            <> matching <span className="font-black">“{searchTerm.trim()}”</span></>
          )}
          .
        </p>
      )}

      <ItemList
        items={filteredItems}
        onDelete={requestDelete}
        isLoading={isLoading}
        hasFilters={hasActiveFilters}
        onClearFilters={clearFilters}
      />

      <ConfirmDialog
        isOpen={Boolean(pendingDeleteItem)}
        title="Delete this item?"
        description={`“${pendingDeleteItem?.name || "This item"}” will be permanently removed from your inventory. This action cannot be undone.`}
        confirmLabel="Delete item"
        isLoading={isDeleting}
        onCancel={() => setPendingDeleteItem(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Home;
