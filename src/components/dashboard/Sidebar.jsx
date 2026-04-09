import {
  FiBarChart2,
  FiPackage,
  FiPlusCircle,
  FiShoppingCart,
  FiTag,
  FiUsers,
  FiLogOut,
} from "react-icons/fi";
import { Link, NavLink } from "react-router";
import useAuthContext from "../../hooks/useAuthContext";
import { MdFavoriteBorder } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";

const Sidebar = () => {
  const { user, logOutUser } = useAuthContext();

  const customerMenus = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    {
      to: "favorite",
      icon: MdFavoriteBorder,
      label: "Favorite",
    },
    { to: "adoption", icon: FiShoppingCart, label: "Adoption" },
    { to: "/shop", icon: FaShoppingBag, label: "Shop" },
  ];

  const AdminMenus = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "pets", icon: FiPackage, label: "Pets" },
    { to: "pets/add", icon: FiPlusCircle, label: "Add Product" },
    { to: "categories", icon: FiTag, label: "Categories" },
    { to: "categories/add", icon: FiPlusCircle, label: "Add Category" },
    {
      to: "favorite",
      icon: MdFavoriteBorder,
      label: "Favorite",
    },
    { to: "adoption", icon: FiShoppingCart, label: "Adoption" },
    { to: "/shop", icon: FaShoppingBag, label: "Shop" },
    { to: "users", icon: FiUsers, label: "Users" },
  ];

  const menuItems = user?.is_staff ? AdminMenus : customerMenus;

  return (
    <div className="drawer-side z-50">
      <label
        htmlFor="drawer-toggle"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>

      <aside className="w-72 min-h-full bg-white p-6 text-gray-600 border-r-4 border-orange-400">
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div>
            <FiShoppingCart className="h-6 w-6 text-yellow-600" />
          </div>
          <Link to={"/"} className="text-2xl font-black tracking-tighter ">
            PETHAVEN
          </Link>
        </div>

        {/* Sidebar Menu */}
        <ul className="space-y-2 ">
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                end
                className={({ isActive }) =>
                  `flex items-center gap-4 px-4 py-3 rounded-xl font-bold transition-all duration-200 ${
                    isActive ? " text-orange-600" : "text-gray-500"
                  }`
                }
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Sidebar Footer */}
        <div className="mt-auto pt-8 border-t-2 border-white/10">
          <button
            className="flex items-center gap-4 w-full px-4 py-3 text-red-600 font-bold hover:bg-red-500 hover:text-white rounded-xl transition-all"
            onClick={() => logOutUser()}
          >
            <FiLogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
          <div className="mt-4 px-4 text-[10px] font-black uppercase tracking-widest text-emerald-400/60">
            © 2026 PetHaven Admin
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
