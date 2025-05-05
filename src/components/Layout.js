import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import { Menu } from "lucide-react";
import LogoutButton from "../auth/Logout";

export default function Layout() {
  const dispatch = useDispatch();

  return (
    <div className="min-h-screen flex bg-gray-100 ">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        {/* Top bar Or Nav bar*/}
        <header className="sticky top-0 z-40  p-4 bg-white shadow-md flex items-center justify-between">
          <button onClick={() => dispatch(toggleSidebar())}>
            <Menu className="w-6 h-6 text-gray-800" />
          </button>

          <LogoutButton/>
        </header>

        {/* Main content will changge on routes*/}
        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
