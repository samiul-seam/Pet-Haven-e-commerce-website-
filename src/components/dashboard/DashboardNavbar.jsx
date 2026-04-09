import { FiMenu, FiX } from "react-icons/fi";
import useAuthContext from "../../hooks/useAuthContext";
import { Link } from "react-router";
import { FaUserCircle } from "react-icons/fa";
import paperImg from "../../assets/images/layer-1.png";

const DashboardNavbar = ({ sidebarOpen }) => {
  const { user, logOutUser } = useAuthContext();

  return (
    <div className="relative">
      <div className="navbar w-full bg-orange-600 border-b border-slate-100  px-4 lg:px-8">
        {/* Mobile Menu Toggle */}
        <div className="flex-none lg:hidden">
          <label
            htmlFor="drawer-toggle"
            className="btn btn-square btn-ghost text-white"
          >
            {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </label>
        </div>

        {/* Brand / Welcome Text */}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-white hidden md:block mx-2">
            PetHaven Portal,
            <span className="text-yellow-500 mx-3">
              {user?.first_name || "User"}
            </span>
            !
          </h2>
        </div>

        {/* Right Side: Profile Dropdown */}
        <div className="flex-none gap-4">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar border border-white/20"
            >
              <div className="w-10 rounded-full flex items-center justify-center bg-yellow-600">
                <FaUserCircle size={32} className="m-auto" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-box z-50 mt-3 w-52 p-2 shadow-xl border "
            >
              <li className="px-4 py-2 opacity-70 text-xs border-b border-white/10 mb-1 text-orange-500">
                {user?.email || "User"}
              </li>
              <li>
                <Link to="/dashboard/profile">Profile</Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <button
                  onClick={() => logOutUser()}
                  className="text-red-600 font-bold hover:text-red-400"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <img
        src={paperImg}
        className="bg-orange-600 w-full h-4 absolute bottom-0 left-0 pointer-events-none"
      />
    </div>
  );
};

export default DashboardNavbar;
