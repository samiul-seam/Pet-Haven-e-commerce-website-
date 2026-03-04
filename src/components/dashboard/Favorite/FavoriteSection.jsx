import { HiHeart } from "react-icons/hi";
import FavorteCard from "./FavorteCard";
import useFavoriteContext from "../../../hooks/useFavoriteContext";

const FavoriteSection = () => {
  const { favorites, loading, removeFavorite } = useFavoriteContext()


  return (
    <div className="p-6 bg-gra-200 shadow-lg shadow-slate-400 min-h-screen">
      <div className="max-w-6xl mx-auto text-bl">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2 text-teal-600">
              <HiHeart className="text-red-500" /> My Favorites
            </h1>
            <p className="text-slate-500">
              Manage the pets you&apos;ve fallen in love with.
            </p>
          </div>
          <div className="stats shadow bg-teal-700/70 shadow-slate-600 hidden sm:inline-flex">
            <div className="stat py-2 px-4">
              <div className="stat-title">Total Saved</div>
              <div className="stat-value text-2xl text-primary">
                {favorites.length}
              </div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-75">
            <span className="loading loading-dots loading-lg text-teal-600"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((item) => (
              <div
                key={item.id}
                className="card bg-base-100 shadow-sm border border-base-300 hover:shadow-md transition-all group"
              >
                <FavorteCard item={item} onRemove={() => removeFavorite(item.id)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteSection;
