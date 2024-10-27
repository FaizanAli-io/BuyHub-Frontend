import React, { useEffect, useState } from "react";
import axios from "axios";

function AllUsers() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 shadow-lg rounded-lg text-gray-300">
        <h2 className="text-3xl font-bold text-center text-cyan-400">
          All Users
        </h2>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user.id} className="border-b border-gray-600 pb-2">
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email} <br />
              <strong>Role:</strong> {user.role} <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AllUsers;
