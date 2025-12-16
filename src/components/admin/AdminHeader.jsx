// src/components/admin/AdminHeader.jsx
import React from "react";
import { Menu } from "lucide-react";
import Dashboard from "../../pages/Dashboard";

const AdminHeader = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <header className="w-full bg-white shadow-md p-4 flex items-center justify-between sticky top-0 z-20">
      {/* Left */}
      <div className="flex items-center gap-4">
        <Menu className="lg:hidden text-gray-700" size={28} />
        <h2 className="text-xl font-semibold text-gray-800">Admin Dashboard</h2>
      </div>

      {/* Right User Section */}
      <div className="flex items-center gap-3">
        <span className="text-gray-700 font-medium">{user?.username || "Admin"}</span>

        {/* Avatar */}
        <div className="w-10 h-10 bg-blue-600 text-white flex items-center justify-center rounded-full font-bold uppercase">
          {user?.username ? user.username[0] : "A"}
        </div>
      </div>
      
    </header>
  );
};

export default AdminHeader;
