import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaPinterest,
  FaUserCircle,
} from "react-icons/fa";
import { Link } from "react-router";
import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import navimg from "../assets/images/layer-1.png";
import { IoLocationSharp } from "react-icons/io5";

const Navbar = () => {
  const { user, logOutUser } = useAuthContext();
  const [isClicked, setIsClicked] = useState("HOME");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = (name) => {
    setMenuOpen(false);
    setIsClicked(name);
    if (document.activeElement) document.activeElement.blur();
  };

  const navLinks = ["HOME", "ABOUT", "SERVICES", "PETS", "SHOP", "DASHBOARD"];

  return (
    <nav className="w-full relative">
      {/* ===== TOP BAR  ===== */}
      <div className="relative w-full overflow-hidden">
        <img
          src={navimg}
          className="w-full h-32 md:h-24 object-cover bg-orange-600"
          alt="header-bg"
        />
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="container mx-auto px-4 md:px-10 lg:px-20 flex flex-col lg:flex-row justify-between items-center text-white text-sm">
            {/* Left Side */}
            <div className="hidden md:flex gap-6 items-center">
              <span className="flex items-center gap-1 hover:text-orange-200 transition-colors">
                <IoLocationSharp className="size-4" /> Tejgaon, Dhaka
              </span>
              <span className="flex items-center gap-1 hover:text-orange-200 transition-colors">
                <FaPhone /> +(880) 1819 790132
              </span>
              <span className="flex items-center gap-1 hover:text-orange-200 transition-colors">
                <FaEnvelope /> mdsamiulhaque682@gmail.com
              </span>
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-4 mt-4 lg:mt-0">
              <button className="bg-white text-orange-600 px-5 py-1.5 rounded-full text-xs font-bold shadow-lg hover:bg-orange-50 active:scale-95 transition-all">
                DONATE
              </button>
              <div className="flex gap-4 text-lg border-l border-white/30 pl-4">
                <FaTwitter className="hover:scale-110 transition-transform cursor-pointer" />
                <FaFacebookF className="hover:scale-110 transition-transform cursor-pointer" />
                <FaYoutube className="hover:scale-110 transition-transform cursor-pointer" />
                <FaPinterest className="hover:scale-110 transition-transform cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== MAIN NAVBAR  ===== */}
      <div className="sticky top-0 z-50 shadow-md bg-white">
        <div className="container mx-auto flex justify-between items-center py-4 px-4 md:px-10 lg:px-20">
          {/* Logo */}
          <Link to="/" onClick={() => setIsClicked("HOME")}>
            <h1 className="text-xl md:text-2xl font-bold text-orange-600">
              PetHaven
            </h1>
            <p className="text-[10px] text-gray-500 hidden sm:block uppercase tracking-widest">
              About Your Pets
            </p>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex gap-8 text-gray-700 font-semibold text-sm">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={link === "HOME" ? "/" : `/${link.toLowerCase()}`}
                onClick={() => handleLinkClick(link)}
                className={`font-bold ${
                  isClicked === link ? "text-orange-600" : "text-gray-700"
                } hover:text-orange-600 transition-colors tracking-wide`}
              >
                {link}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex-none gap-4">
                  <div className="dropdown dropdown-end">
                    <div className="dropdown dropdown-end">
                      <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-ghost btn-circle avatar border border-white/20"
                      >
                        <div className="w-10 rounded-full flex items-center justify-center bg-orange-600">
                          <FaUserCircle size={32} className="m-auto" />
                        </div>
                      </div>
                      <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white text-gray-700 rounded-box z-1 mt-3 w-52 p-2 shadow-xl border "
                      >
                        <li className="px-4 py-2 opacity-70 text-xs border-b border-white/10 mb-1">
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
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-white hover:text-orange-600 border-2 border-orange-600 transition-all font-bold text-xs hidden lg:block"
              >
                LOGIN
              </Link>
            )}

            {/* Hamburger for Mobile */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-2xl text-gray-800"
            >
              {menuOpen ? "✕" : "☰"}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white border-t px-6 py-6 space-y-4 font-semibold text-gray-700 shadow-xl">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={link === "HOME" ? "/" : `/${link.toLowerCase()}`}
                onClick={() => handleLinkClick(link)}
                className={`block text-lg ${isClicked === link ? "text-orange-600" : "text-gray-700"}`}
              >
                {link}
              </Link>
            ))}
            {!user && (
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block text-center bg-orange-600 text-white py-3 rounded-xl"
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
