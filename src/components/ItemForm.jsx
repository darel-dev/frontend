import { useState, useEffect } from "react";

const categories = [
  { value: "Electronics", emoji: "💻" },
  { value: "Clothing", emoji: "👕" },
  { value: "Books", emoji: "📚" },
  { value: "Food", emoji: "🍎" },
  { value: "Other", emoji: "📦" },
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
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.price || Number(formData.price) <= 0)
      newErrors.price = "Price must be greater than 0";
    if (!formData.category) newErrors.category = "Category is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
      });
    }
  };

  const inputBase =
    "w-full rounded-xl border bg-white px-4 py-2.5 text-sm transition-all duration-200 outline-none focus:ring-4";
  const inputNormal = `${inputBase} border-gray-200 focus:border-indigo-400 focus:ring-indigo-100`;
  const inputError = `${inputBase} border-rose-300 focus:border-rose-400 focus:ring-rose-100`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name */}
      <div>
        <label
          htmlFor="name"
          className="mb-1.5 block text-sm font-semibold text-gray-700"
        >
          Item Name <span className="text-rose-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g. Wireless Headphones"
          className={errors.name ? inputError : inputNormal}
        />
        {errors.name && (
          <p className="mt-1 text-xs font-medium text-rose-600">{errors.name}</p>
        )}
      </div>

      {/* Description */}
      <div>
        <label
          htmlFor="description"
          className="mb-1.5 block text-sm font-semibold text-gray-700"
        >
          Description <span className="text-rose-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the item..."
          rows={4}
          className={`${errors.description ? inputError : inputNormal} resize-none`}
        />
        {errors.description && (
          <p className="mt-1 text-xs font-medium text-rose-600">{errors.description}</p>
        )}
      </div>

      {/* Price and Category Row */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="price"
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            Price (USD) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-400">$</span>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className={`${errors.price ? inputError : inputNormal} pl-7`}
            />
          </div>
          {errors.price && (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.price}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="category"
            className="mb-1.5 block text-sm font-semibold text-gray-700"
          >
            Category <span className="text-rose-500">*</span>
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`${errors.category ? inputError : inputNormal} cursor-pointer`}
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.emoji}  {c.value}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.category}</p>
          )}
        </div>
      </div>

      {/* In Stock Toggle */}
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50/60 px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-gray-700">Availability</p>
          <p className="text-xs text-gray-500">
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
          <div className="peer h-6 w-11 rounded-full bg-gray-300 transition-colors after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] peer-checked:bg-emerald-500 peer-checked:after:translate-x-full peer-focus:ring-4 peer-focus:ring-emerald-100" />
        </label>
      </div>

      {/* Submit */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-indigo-200 transition-all duration-200 hover:from-indigo-600 hover:to-indigo-700 hover:shadow-md hover:shadow-indigo-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <svg
                className="h-4 w-4 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
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
