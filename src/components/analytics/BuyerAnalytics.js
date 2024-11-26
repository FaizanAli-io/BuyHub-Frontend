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

// Pie chart data for Item Count and Total Spent
const BuyerAnalytics = ({ analytics }) => {
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
        label: "Total Spent",
        data: analytics.categories.map((category) => category.totalSpent),
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
    labels: analytics.spendingByMonth.map((month) => month.month),
    datasets: [
      {
        label: "Spending",
        data: analytics.spendingByMonth.map((month) => month.spending),
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="grid grid-cols-2 gap-8">
          <h3 className="text-lg text-gray-300 mb-2">Total Spent</h3>
          <p className="text-xl text-white">${analytics.totalSpent}</p>
        </div>
      </div>

      <div className="my-8 grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <h3 className="text-lg text-gray-300 mb-4">Item Count by Category</h3>
          <Pie data={pieDataItemCount} />
        </div>
        <div className="col-span-1">
          <h3 className="text-lg text-gray-300 mb-4">
            Total Spent by Category
          </h3>
          <Pie data={pieDataWorth} />
        </div>
      </div>

      <div className="my-8">
        <h3 className="text-lg text-gray-300">
          Spending by Month (Last 6 months)
        </h3>
        <Bar data={barData} />
      </div>
    </>
  );
};

export default BuyerAnalytics;
