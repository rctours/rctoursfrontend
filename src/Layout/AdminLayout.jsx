import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";
import AdminHeader from "../components/admin/AdminHeader";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Sidebar */}
      <AdminSidebar />

      {/* RIGHT CONTENT AREA */}
      <div className="lg:ml-64"> 
        {/* Push content to right by sidebar width */}
        
        <AdminHeader />

        <main className="p-6">
          <Outlet />
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;
