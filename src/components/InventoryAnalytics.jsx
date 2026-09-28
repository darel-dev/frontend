import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import { formatCfa } from "../utils/currency";

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip
);

const CATEGORY_ORDER = ["Electronics", "Clothing", "Books", "Food", "Other"];

const CATEGORY_COLORS = {
  Electronics: { solid: "#3b82f6", soft: "#bfdbfe" },
  Clothing: { solid: "#ec4899", soft: "#fbcfe8" },
  Books: { solid: "#f59e0b", soft: "#fde68a" },
  Food: { solid: "#10b981", soft: "#a7f3d0" },
  Other: { solid: "#64748b", soft: "#cbd5e1" },
};

const chartCardClass =
  "rounded-[1.5rem] border border-white/70 bg-white/95 p-5 shadow-xl shadow-slate-200/60 ring-1 ring-slate-900/5 backdrop-blur sm:p-6";

const EmptyChartState = ({ children }) => (
  <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 text-center text-sm font-medium text-slate-500">
    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm ring-1 ring-slate-200">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
        <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-4a1 1 0 011-1h2a1 1 0 011 1v13a1 1 0 01-1 1h-2a1 1 0 01-1-1V3z" />
      </svg>
    </div>
    {children}
  </div>
);

const InventoryAnalytics = ({ items }) => {
  const categoryData = CATEGORY_ORDER.map((category) => {
    const categoryItems = items.filter((item) => item.category === category);

    return {
      category,
      count: categoryItems.length,
      value: categoryItems.reduce(
        (total, item) => total + (Number(item.price) || 0),
        0
      ),
    };
  }).filter((entry) => entry.count > 0);

  const inStock = items.filter((item) => item.inStock).length;
  const outOfStock = items.length - inStock;
  const totalValue = items.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  const averageValue = items.length ? totalValue / items.length : 0;
  const largestCategory = categoryData.reduce(
    (largest, entry) => (!largest || entry.count > largest.count ? entry : largest),
    null
  );

  const categoryChartData = {
    labels: categoryData.map((entry) => entry.category),
    datasets: [
      {
        label: "Products",
        data: categoryData.map((entry) => entry.count),
        backgroundColor: categoryData.map(
          (entry) => CATEGORY_COLORS[entry.category]?.solid || CATEGORY_COLORS.Other.solid
        ),
        borderRadius: 10,
        maxBarThickness: 38,
        yAxisID: "count",
      },
      {
        label: "Inventory value",
        data: categoryData.map((entry) => entry.value),
        backgroundColor: categoryData.map(
          (entry) => CATEGORY_COLORS[entry.category]?.soft || CATEGORY_COLORS.Other.soft
        ),
        borderRadius: 10,
        maxBarThickness: 38,
        yAxisID: "value",
      },
    ],
  };

  const categoryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: "index", intersect: false },
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 18,
          color: "#475569",
          font: { weight: 700 },
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        cornerRadius: 12,
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || "";
            return `${label}: ${
              label === "Inventory value"
                ? formatCfa(context.parsed.y)
                : context.parsed.y
            }`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: "#64748b", font: { weight: 700 } },
      },
      count: {
        beginAtZero: true,
        position: "left",
        ticks: { precision: 0, color: "#64748b" },
        grid: { color: "#e2e8f0" },
      },
      value: {
        beginAtZero: true,
        position: "right",
        grid: { drawOnChartArea: false },
        ticks: {
          color: "#64748b",
          callback: (value) => formatCfa(value),
        },
      },
    },
  };

  const stockChartData = {
    labels: ["In stock", "Out of stock"],
    datasets: [
      {
        data: [inStock, outOfStock],
        backgroundColor: ["#10b981", "#f43f5e"],
        borderColor: "#ffffff",
        borderWidth: 5,
        hoverOffset: 9,
      },
    ],
  };

  const stockChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          padding: 18,
          color: "#475569",
          font: { weight: 700 },
        },
      },
      tooltip: {
        backgroundColor: "#0f172a",
        padding: 12,
        cornerRadius: 12,
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}`,
        },
      },
    },
  };

  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-indigo-600">Visual insights</p>
          <h2 className="mt-1 text-2xl font-black tracking-tight text-slate-950">
            Inventory Analytics
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            See how products, value, and availability are distributed.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/70 bg-white/80 p-2 text-center shadow-sm ring-1 ring-slate-900/5">
          <div className="rounded-xl bg-slate-50 px-3 py-2">
            <p className="text-sm font-black text-slate-950">{formatCfa(averageValue)}</p>
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Avg.</p>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2">
            <p className="text-sm font-black text-slate-950">{largestCategory?.category || "—"}</p>
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Top cat.</p>
          </div>
          <div className="rounded-xl bg-slate-50 px-3 py-2">
            <p className="text-sm font-black text-slate-950">{items.length}</p>
            <p className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Items</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className={chartCardClass}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-black text-slate-950">
                Products by category
              </h3>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Item count and total CFA value
              </p>
            </div>
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700 ring-1 ring-indigo-100">
              {categoryData.length} groups
            </span>
          </div>
          <div className="h-72">
            {categoryData.length === 0 ? (
              <EmptyChartState>Add products to see category analytics.</EmptyChartState>
            ) : (
              <Bar data={categoryChartData} options={categoryChartOptions} />
            )}
          </div>
        </div>

        <div className={chartCardClass}>
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-black text-slate-950">Stock status</h3>
              <p className="mt-1 text-xs font-medium text-slate-500">
                Current availability breakdown
              </p>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-100">
              {items.length ? Math.round((inStock / items.length) * 100) : 0}% ready
            </span>
          </div>
          <div className="h-72">
            {items.length === 0 ? (
              <EmptyChartState>Add products to see stock analytics.</EmptyChartState>
            ) : (
              <Doughnut data={stockChartData} options={stockChartOptions} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default InventoryAnalytics;
