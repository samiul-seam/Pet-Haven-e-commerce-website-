import { FaUserCircle } from "react-icons/fa";
import { MdFavoriteBorder } from "react-icons/md";
import { Link } from "react-router";
import useAuthContext from "../hooks/useAuthContext";
import useFavoriteContext from "../hooks/useFavoriteContext";
import { useEffect, useState } from "react";
import authApiClient from "../services/auth-api-client";

const Navbar = () => {
  const { user, logOutUser } = useAuthContext();
  const { favorites } = useFavoriteContext();
  const [orderCount, setOrderCount] = useState(0);

  const handleLinkClick = () => {
    const element = document.activeElement;
    if (element) {
      element.blur();
    }
  };

  
  useEffect(() => {
    const fetchAdopt = async () => {
      try {
        const res = await authApiClient.get("adoptions/");
        setOrderCount(res.data.length);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchAdopt();
  }, []);


  return (
    <nav className="sticky top-0 z-50 w-full bg-teal-800/90 backdrop-blur-md text-white shadow-lg">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-8">
        {/* Left Side: Logo & Mobile Dropdown */}
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-teal-900 rounded-box w-52 gap-2 text-white"
            >
              <li>
                <Link to="/" onClick={handleLinkClick}>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" onClick={handleLinkClick}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/shop" onClick={handleLinkClick}>
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" onClick={handleLinkClick}>
                  About
                </Link>
              </li>
            </ul>
          </div>
          <Link
            to="/"
            className="text-xl font-bold flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span>🐾</span> PetHaven
          </Link>
        </div>

        {/* Center: Desktop Menu */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2 font-medium">
            <li>
              <Link
                to="/"
                className="hover:bg-white/10"
                onClick={handleLinkClick}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="hover:bg-white/10"
                onClick={handleLinkClick}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="hover:bg-white/10"
                onClick={handleLinkClick}
              >
                Shop
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:bg-white/10"
                onClick={handleLinkClick}
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Side: Icons/Profile */}
        <div className="navbar-end gap-2">
          {user ? (
            <div className="flex items-center gap-1 md:gap-3">
              <button className="btn btn-ghost btn-circle text-xl hover:bg-white/10">
                <span className="relative">
                  <Link to={"/dashboard/favorite"}>
                    <MdFavoriteBorder />
                    <span className="badge badge-xs bg-teal-700 absolute -top-2 -right-2">
                      {favorites.length}
                    </span>
                  </Link>
                </span>
              </button>

              <button className="btn btn-ghost btn-circle text-xl hover:bg-white/10">
                <span className="relative">
                  <Link to="/dashboard/adoption">
                    🛒
                    <span className="badge badge-xs bg-teal-700 absolute -top-1 -right-1">
                      {orderCount}
                    </span>
                  </Link>
                </span>
              </button>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar border border-white/20"
                >
                  <div className="w-10 rounded-full flex items-center justify-center bg-teal-800">
                    <FaUserCircle size={32} className="m-auto" />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-teal-900 text-white rounded-box z-1 mt-3 w-52 p-2 shadow-xl border "
                >
                  <li className="px-4 py-2 opacity-70 text-xs border-b border-white/10 mb-1">
                    {user?.email || "User"}
                  </li>
                  <li>
                    <Link to="/dashboard/profile" onClick={handleLinkClick}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to="/settings" onClick={handleLinkClick}>
                      Settings
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => logOutUser()}
                      className="text-red-300 hover:text-red-100"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-ghost hover:underline">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
