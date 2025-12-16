// src/components/admin/AdminSidebar.jsx
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Users,
  LogOut,
  Menu,
  X,
  MessageCircleCodeIcon,
  Car,
} from "lucide-react";

 

const AdminSidebar = () => {
  const [open, setOpen] = useState(false);

  

  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Lead Message", path: "/admin/message", icon: <Users size={20} /> },
    { name: "Blogs", path: "/admin/blogs", icon: <FileText size={20} /> },
    { name: "Cars", path: "/admin/cars", icon: <Car size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-blue-600 text-white rounded-md shadow-md"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-gray-900 text-white w-64 p-6 shadow-xl transform 
          ${open ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-300 lg:translate-x-0 z-40`}
      >
        {/* Close Button - Mobile */}
        <button
          onClick={() => setOpen(false)}
          className="lg:hidden absolute top-4 right-4 text-white"
        >
          <X size={28} />
        </button>

        <h2 className="text-2xl font-bold mb-10 flex items-center">
          Admin Panel
        </h2>

        {/* Menu */}
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setOpen(false)}  // CLOSE ON CLICK
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition 
                 ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700"}`
              }
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full flex items-center gap-3 px-4 py-3 
            bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <LogOut size={20} />
          Logout
        </button>
      </aside>
    </>
  );
};

export default AdminSidebar;
