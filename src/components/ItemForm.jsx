import { useEffect, useState } from "react";
import { formatCfa } from "../utils/currency";

const categories = [
  { value: "Electronics", emoji: "💻", tone: "from-blue-500 to-indigo-500" },
  { value: "Clothing", emoji: "👕", tone: "from-pink-500 to-rose-500" },
  { value: "Books", emoji: "📚", tone: "from-amber-500 to-orange-500" },
  { value: "Food", emoji: "🍎", tone: "from-emerald-500 to-teal-500" },
  { value: "Other", emoji: "📦", tone: "from-slate-500 to-gray-600" },
];

const ItemForm = ({ initialData, onSubmit, isLoading, buttonText }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Other",
    inStock: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        name: initialData.name || "",
        description: initialData.description || "",
        price: initialData.price || "",
        category: initialData.category || "Other",
        inStock: initialData.inStock ?? true,
      });
    }
  }, [initialData]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.price || Number(formData.price) <= 0) {
      newErrors.price = "Price must be greater than 0";
    }
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleCategoryChange = (category) => {
    setFormData((prev) => ({ ...prev, category }));
    if (errors.category) {
      setErrors((prev) => ({ ...prev, category: "" }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
      });
    }
  };

  const selectedCategory =
    categories.find((category) => category.value === formData.category) || categories.at(-1);
  const previewName = formData.name.trim() || "Item name";
  const previewDescription = formData.description.trim() || "A concise description will appear here as you type.";
  const inputBase =
    "w-full rounded-2xl border bg-white px-4 py-3 text-sm font-medium text-slate-900 shadow-sm outline-none transition-all duration-200 placeholder:text-slate-400 focus:ring-4";
  const inputNormal = `${inputBase} border-slate-200 focus:border-indigo-300 focus:ring-indigo-100`;
  const inputError = `${inputBase} border-rose-300 focus:border-rose-400 focus:ring-rose-100`;

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <div className="space-y-6">
          <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.447.894L10 14.118l-4.553 2.776A1 1 0 014 16V4zm2 0v10.211l3.447-2.102a1 1 0 011.106 0L14 14.211V4H6z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <h2 className="font-black text-slate-950">Item details</h2>
                <p className="text-sm text-slate-500">Name and describe the product clearly.</p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-bold text-slate-700">
                  Item Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Wireless Headphones"
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className={errors.name ? inputError : inputNormal}
                />
                {errors.name && (
                  <p id="name-error" className="mt-1.5 text-xs font-bold text-rose-600">
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="mb-1.5 block text-sm font-bold text-slate-700">
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the item, specifications, or notes..."
                  rows={5}
                  aria-invalid={Boolean(errors.description)}
                  aria-describedby={errors.description ? "description-error" : undefined}
                  className={`${errors.description ? inputError : inputNormal} resize-none`}
                />
                {errors.description && (
                  <p id="description-error" className="mt-1.5 text-xs font-bold text-rose-600">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </section>

          <section className="rounded-[1.5rem] border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
            <div className="mb-5 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-slate-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </span>
              <div>
                <h2 className="font-black text-slate-950">Pricing & category</h2>
                <p className="text-sm text-slate-500">Set value, category, and availability.</p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="price" className="mb-1.5 block text-sm font-bold text-slate-700">
                  Price (CFA francs) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 rounded-lg bg-slate-100 px-2 py-1 text-[0.68rem] font-black text-slate-500">CFA</span>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="0"
                    step="0.01"
                    min="0"
                    aria-invalid={Boolean(errors.price)}
                    aria-describedby={errors.price ? "price-error" : undefined}
                    className={`${errors.price ? inputError : inputNormal} pl-[4.25rem]`}
                  />
                </div>
                {errors.price && (
                  <p id="price-error" className="mt-1.5 text-xs font-bold text-rose-600">
                    {errors.price}
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-bold text-slate-700">Availability</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {formData.inStock ? "Item is currently available" : "Item is currently unavailable"}
                    </p>
                  </div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      type="checkbox"
                      name="inStock"
                      checked={formData.inStock}
                      onChange={handleChange}
                      className="peer sr-only"
                    />
                    <span className="peer h-7 w-12 rounded-full bg-slate-300 transition-colors after:absolute after:left-[3px] after:top-[3px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-5 peer-focus:ring-4 peer-focus:ring-emerald-100" />
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex items-center justify-between gap-3">
                <label className="block text-sm font-bold text-slate-700">
                  Category <span className="text-rose-500">*</span>
                </label>
                {errors.category && (
                  <p className="text-xs font-bold text-rose-600">{errors.category}</p>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {categories.map((category) => {
                  const isSelected = formData.category === category.value;
                  return (
                    <button
                      key={category.value}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => handleCategoryChange(category.value)}
                      className={`group rounded-2xl border px-3 py-3 text-left transition-all ${
                        isSelected
                          ? "border-indigo-200 bg-white shadow-lg shadow-indigo-100 ring-2 ring-indigo-200"
                          : "border-slate-200 bg-white/70 hover:border-indigo-200 hover:bg-white hover:shadow-sm"
                      }`}
                    >
                      <span className={`mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br text-lg shadow-sm transition-transform group-hover:scale-105 ${category.tone}`}>
                        {category.emoji}
                      </span>
                      <span className="block text-sm font-black text-slate-900">{category.value}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-28">
          <div className="overflow-hidden rounded-[1.5rem] border border-slate-200 bg-white shadow-xl shadow-slate-200/70 ring-1 ring-slate-900/5">
            <div className={`h-24 bg-gradient-to-br ${selectedCategory.tone}`} />
            <div className="p-5">
              <div className="-mt-12 mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-xl ring-1 ring-slate-200">
                {selectedCategory.emoji}
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600">Live preview</p>
              <h3 className="mt-2 text-xl font-black tracking-tight text-slate-950">
                {previewName}
              </h3>
              <p className="mt-2 line-clamp-4 text-sm leading-6 text-slate-500">
                {previewDescription}
              </p>
              <div className="mt-5 grid gap-3">
                <div className="rounded-2xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Price</p>
                  <p className="mt-1 text-2xl font-black text-slate-950">
                    {formatCfa(formData.price)}
                  </p>
                </div>
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Category</p>
                    <p className="mt-1 font-black text-slate-950">{formData.category}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-black ring-1 ring-inset ${
                      formData.inStock
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
                        : "bg-rose-50 text-rose-700 ring-rose-200"
                    }`}
                  >
                    {formData.inStock ? "In stock" : "Out of stock"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 to-violet-600 px-6 py-3 text-sm font-black text-white shadow-xl shadow-indigo-500/20 transition-all duration-200 hover:-translate-y-0.5 hover:from-indigo-600 hover:to-violet-700 hover:shadow-indigo-500/30 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Processing...
            </>
          ) : (
            buttonText || "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;
