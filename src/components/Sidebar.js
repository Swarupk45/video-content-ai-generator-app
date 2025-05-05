import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../redux/slices/sidebarSlice";
import { Link, useLocation } from "react-router-dom";
import { MdSpaceDashboard } from "react-icons/md";
import { MdOutlineMovieFilter } from "react-icons/md";
import { FaRobot } from "react-icons/fa";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function Sidebar() {
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const location = useLocation(); // Detect current route

  //added for only mobile view.
  const closeMobileSidebar = () => {
    if (window.innerWidth < 768) {
      dispatch(toggleSidebar());
    }
  };

  // Function to apply active styles
  const getLinkClass = (path) =>
    `block px-3 py-2 rounded transition ${
      location.pathname === path
        ? "bg-blue-600 text-white flex gap-1 "
        : "text-gray-300 hover:bg-blue-600 flex gap-1 "
    }`;

  return (
    <>
      
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={() => dispatch(toggleSidebar())}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 h-screen md:sticky z-50 bg-slate-900 text-white shadow-xl transform transition-transform duration-300 w-64
        ${isOpen ? "translate-x-0" : "-translate-x-full hidden"} md:translate-x-0`}
      >
        <div className="p-6 flex flex-col h-full">
          <div className="text-2xl flex justify-center gap-1 font-extrabold text-blue-500 tracking-wide mb-4">
            <MdOutlineMovieFilter fontSize={35}/> Creator Hub
          </div>
          <div className="h-[1px] w-full bg-slate-700 mb-6"></div>

          <nav className="space-y-4 font-medium flex-grow">
            <Link to="/" className={getLinkClass("/")} onClick={closeMobileSidebar}>
            <MdSpaceDashboard color="white" fontSize={30}/>  Dashboard
            </Link>
            <Link to="/generate" className={getLinkClass("/generate")} onClick={closeMobileSidebar}>
              <FaRobot color="white" fontSize={30}/>  Generate Content AI
            </Link>
            <Link to="/upload" className={getLinkClass("/upload")} onClick={closeMobileSidebar}>
              <FaCloudUploadAlt color="white" fontSize={30}/> Upload Video
            </Link>
          </nav>

          <div className="text-sm text-slate-400 mt-auto pt-4 border-t border-slate-700">
            <p>© 2025 Creator Hub</p>
          </div>
        </div>
      </aside>
    </>
  );
}
