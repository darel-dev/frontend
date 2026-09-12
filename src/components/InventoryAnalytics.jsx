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

const chartCardClass =
  "rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6";

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

  const categoryChartData = {
    labels: categoryData.map((entry) => entry.category),
    datasets: [
      {
        label: "Products",
        data: categoryData.map((entry) => entry.count),
        backgroundColor: "#6366f1",
        borderRadius: 6,
        maxBarThickness: 36,
        yAxisID: "count",
      },
      {
        label: "Inventory value",
        data: categoryData.map((entry) => entry.value),
        backgroundColor: "#c4b5fd",
        borderRadius: 6,
        maxBarThickness: 36,
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
        labels: { usePointStyle: true, padding: 18 },
      },
      tooltip: {
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
        ticks: { color: "#6b7280" },
      },
      count: {
        beginAtZero: true,
        position: "left",
        ticks: { precision: 0, color: "#6b7280" },
        grid: { color: "#e5e7eb" },
      },
      value: {
        beginAtZero: true,
        position: "right",
        grid: { drawOnChartArea: false },
        ticks: {
          color: "#6b7280",
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
        borderWidth: 4,
        hoverOffset: 8,
      },
    ],
  };

  const stockChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: {
        position: "bottom",
        labels: { usePointStyle: true, padding: 18 },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.parsed}`,
        },
      },
    },
  };

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-gray-900">
          Inventory Analytics
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          See how your products and inventory value are distributed.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className={chartCardClass}>
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900">
              Products by category
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              Item count and total CFA value
            </p>
          </div>
          <div className="h-72">
            {categoryData.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                Add products to see category analytics.
              </div>
            ) : (
              <Bar data={categoryChartData} options={categoryChartOptions} />
            )}
          </div>
        </div>

        <div className={chartCardClass}>
          <div className="mb-5">
            <h3 className="font-semibold text-gray-900">Stock status</h3>
            <p className="mt-1 text-xs text-gray-500">
              Current availability breakdown
            </p>
          </div>
          <div className="h-72">
            {items.length === 0 ? (
              <div className="flex h-full items-center justify-center text-sm text-gray-500">
                Add products to see stock analytics.
              </div>
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
