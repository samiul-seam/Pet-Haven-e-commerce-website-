import DashboardNavbar from "../components/dashboard/DashboardNavbar";
import { Outlet } from "react-router";
import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div className="drawer lg:drawer-open bg-slate-50 min-h-screen">
      <input
        id="drawer-toggle"
        type="checkbox"
        className="drawer-toggle"
        checked={sidebarOpen}
        onChange={toggleSidebar}
      />

      {/* Main Content Area */}
      <div className="drawer-content flex flex-col">
        <DashboardNavbar sidebarOpen={sidebarOpen} />

        <main className="p-4 md:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      <Sidebar />
    </div>
  );
};

export default DashboardLayout;
