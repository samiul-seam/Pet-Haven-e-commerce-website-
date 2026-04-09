import { Link } from "react-router";

const Header = () => {
  return (
    <nav className="relative w-full bg-white px-8 py-12 overflow-hidden">
      <div className="absolute top-5 left-30 -translate-y-1/4 -translate-x-10 pointer-events-none select-none">
        <span className="text-8xl font-bold text-gray-50 opacity-100 whitespace-nowrap outline-text">
          PetHaven Services
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Main Logo / Title Area */}
        <div className="flex items-baseline gap-4 mb-8">
          <h1 className="text-6xl font-black tracking-tighter text-black">
            PetHaven
          </h1>
          <h2 className="text-6xl font-medium italic tracking-tight text-gray-700">
            Services
          </h2>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-6 text-sm font-bold tracking-widest">
          <Link
            to="/"
            className="text-orange-600 hover:text-orange-700 transition-colors"
          >
            HOME
          </Link>

          <span className="text-yellow-800 font-light text-xl">||</span>

          <h3 className="text-black hover:text-gray-600 transition-colors border-b-2 border-black pb-0.5">
            SERVICES
          </h3>
        </div>
      </div>

    </nav>
  );
};

export default Header;
