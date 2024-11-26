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

const AdminAnalytics = ({ analytics }) => {
  // Pie data for total stock by category
  const pieDataStock = {
    labels: analytics.totalInventoryByCategory.map(
      (category) => category.category
    ),
    datasets: [
      {
        label: "Total Stock",
        data: analytics.totalInventoryByCategory.map(
          (category) => category.totalStock
        ),
        backgroundColor: [
          "#FF5733",
          "#33FF57",
          "#3357FF",
          "#FF33A1",
          "#5733FF",
          "#FFD700",
        ],
      },
    ],
  };

  // Pie data for total purchases by category
  const pieDataPurchases = {
    labels: analytics.totalPurchasesByCategory.map(
      (category) => category.category
    ),
    datasets: [
      {
        label: "Total Purchases",
        data: analytics.totalPurchasesByCategory.map(
          (category) => category.totalPurchased
        ),
        backgroundColor: [
          "#4CAF50",
          "#388E3C",
          "#FF6347",
          "#8A2BE2",
          "#FF5733",
          "#32CD32",
        ],
      },
    ],
  };

  // Pie chart data for Total Stock Value by Category
  const pieDataStockValue = {
    labels: analytics.totalStockValueByCategory.map(
      (category) => category.category
    ),
    datasets: [
      {
        label: "Total Stock Value",
        data: analytics.totalStockValueByCategory.map(
          (category) => category.totalStockValue
        ),
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

  // Pie chart data for Total Purchase Value by Category
  const pieDataPurchaseValue = {
    labels: analytics.totalPurchaseValueByCategory.map(
      (category) => category.category
    ),
    datasets: [
      {
        label: "Total Purchase Value",
        data: analytics.totalPurchaseValueByCategory.map(
          (category) => category.totalPurchaseValue
        ),
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

  // Bar data for stock and spending by month
  const barDataStockSpending = {
    labels: analytics.stockAndSpendingByMonth.map((month) => month.month),
    datasets: [
      {
        label: "Total Stock",
        data: analytics.stockAndSpendingByMonth.map(
          (month) => month.totalStock
        ),
        backgroundColor: "#4CAF50",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
      {
        label: "Total Spent",
        data: analytics.stockAndSpendingByMonth.map(
          (month) => month.totalSpent
        ),
        backgroundColor: "#FF6347",
        borderColor: "#D32F2F",
        borderWidth: 1,
      },
    ],
  };

  // Bar data for user sign-ups by month
  const barDataSignUps = {
    labels: analytics.userSignUpsByMonth.map((signup) => signup.month),
    datasets: [
      {
        label: "User Sign-Ups",
        data: analytics.userSignUpsByMonth.map((signup) => signup.signups),
        backgroundColor: "#32CD32",
        borderColor: "#388E3C",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="my-8 space-y-8">
      {/* Total Stock and Total Spent Overview */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl text-cyan-400 mb-4">Total Overview</h2>
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg text-gray-300 mb-2">Total Stocked</h3>
            <p className="text-xl text-white">${analytics.totalStock}</p>
          </div>
          <div>
            <h3 className="text-lg text-gray-300 mb-2">Total Spent</h3>
            <p className="text-xl text-white">${analytics.totalSpent}</p>
          </div>
        </div>
      </div>

      {/* Total Inventory by Category (Pie Chart) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg text-gray-300 mb-4">
            Total Stock by Category
          </h3>
          <Pie data={pieDataStock} />
        </div>

        {/* Total Purchases by Category (Pie Chart) */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-lg text-gray-300 mb-4">
            Total Purchases by Category
          </h3>
          <Pie data={pieDataPurchases} />
        </div>
      </div>

      {/* Total Inventory Value by Category (Pie Chart) */}
      <div className="my-8 grid grid-cols-2 gap-8">
        <div className="col-span-1">
          <h3 className="text-lg text-gray-300 mb-4">
            Total Stock Value by Category
          </h3>
          <Pie data={pieDataStockValue} />
        </div>

        {/* Total Purchase Value by Category (Pie Chart) */}
        <div className="col-span-1">
          <h3 className="text-lg text-gray-300 mb-4">
            Total Purchase Value by Category
          </h3>
          <Pie data={pieDataPurchaseValue} />
        </div>
      </div>

      {/* Stock and Spending by Month (Bar Chart) */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg text-gray-300 mb-4">
          Stock and Spending by Month
        </h3>
        <Bar data={barDataStockSpending} />
      </div>

      {/* User Sign-Ups by Month (Bar Chart) */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-lg text-gray-300 mb-4">User Sign-Ups by Month</h3>
        <Bar data={barDataSignUps} />
      </div>
    </div>
  );
};

export default AdminAnalytics;
