import React from "react";
import { useFetchData } from "../hooks/useFetchData";
import axios from "axios";

function AllUsers() {
  const [users, setUsers] = useFetchData("users");

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3000/users/${userId}`);
        alert("User deleted successfully!");
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-lg text-gray-300">
        <h2 className="text-3xl font-bold text-center text-cyan-400">
          All Users
        </h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li
              key={user.id}
              className="border-b border-gray-600 pb-2 flex justify-between items-center"
            >
              <div>
                <strong>Name:</strong> {user.name} <br />
                <strong>Email:</strong> {user.email} <br />
                <strong>Role:</strong> {user.role} <br />
              </div>
              <button
                onClick={() => handleDelete(user.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllUsers;
