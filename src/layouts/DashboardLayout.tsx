import { Outlet } from "react-router";
import Sidebar from "../components/Sidebar";

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <main className="flex-1 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
}