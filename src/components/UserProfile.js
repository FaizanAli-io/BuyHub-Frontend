import React from "react";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

function UserProfile({ user }) {
  const formattedCreatedAt = formatDate(user.createdAt);

  return (
    <div className="max-w-4xl mx-auto bg-gray-800 shadow-lg rounded-lg p-8 mt-16">
      <h2 className="text-4xl font-extrabold text-center text-blue-400 mb-2">
        {user.name}
      </h2>
      <p className="text-center text-gray-400 mb-8 text-lg italic">
        {user.role}
      </p>

      <div className="grid grid-cols-1 gap-y-6 text-lg">
        <p className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all">
          <strong className="block text-gray-400 uppercase text-sm">
            Email
          </strong>
          <span className="text-gray-300">{user.email}</span>
        </p>
        <p className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all">
          <strong className="block text-gray-400 uppercase text-sm">
            Joined On
          </strong>
          <span className="text-gray-300">{formattedCreatedAt}</span>
        </p>

        {/* Display Address */}
        {user.address && (
          <p className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all">
            <strong className="block text-gray-400 uppercase text-sm">
              Address
            </strong>
            <span className="text-gray-300">{user.address}</span>
          </p>
        )}

        {/* Display Balance if not an Admin */}
        {user.role !== "ADMIN" && user.balance !== undefined && (
          <p className="bg-gray-700 rounded-lg p-4 hover:bg-gray-600 transition-all">
            <strong className="block text-gray-400 uppercase text-sm">
              Balance
            </strong>
            <span className="text-gray-300">${user.balance}</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
