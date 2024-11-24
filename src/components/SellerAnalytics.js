import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Title,
  Legend,
  Tooltip,
  ArcElement,
  BarElement,
  LinearScale,
  CategoryScale,
  Chart as ChartJS,
} from "chart.js";

ChartJS.register(
  Title,
  Legend,
  Tooltip,
  ArcElement,
  BarElement,
  LinearScale,
  CategoryScale
);

// Pie chart data for Item Count and Total Worth
const SellerAnalytics = ({ analytics }) => {
  const pieDataItemCount = {
    labels: analytics.categories.map((category) => category.category),
    datasets: [
      {
        label: "Item Counts",
        data: analytics.categories.map((category) => category.itemCount),
        backgroundColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF33A1",
          "#FF5733",
        ],
      },
    ],
  };

  const pieDataWorth = {
    labels: analytics.categories.map((category) => category.category),
    datasets: [
      {
        label: "Total Worth",
        data: analytics.categories.map((category) => category.totalWorth),
        backgroundColor: [
          "#FFD700",
          "#4B0082",
          "#32CD32",
          "#8A2BE2",
          "#FF6347",
        ],
      },
    ],
  };

  const barData = {
    labels: analytics.inventoryByMonth.map((month) => month.month),
    datasets: [
      {
        label: "Inventory Worth",
        data: analytics.inventoryByMonth.map((month) => month.inventoryWorth),
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="my-8 grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <h3 className="text-lg text-gray-300 mb-4">Item Count by Category</h3>
          <Pie data={pieDataItemCount} />
        </div>
        <div className="col-span-1">
          <h3 className="text-lg text-gray-300 mb-4">
            Total Worth by Category
          </h3>
          <Pie data={pieDataWorth} />
        </div>
      </div>

      <div className="my-8">
        <h3 className="text-lg text-gray-300">
          Inventory Worth by Month (Last 6 months)
        </h3>
        <Bar data={barData} />
      </div>
    </>
  );
};

export default SellerAnalytics;
