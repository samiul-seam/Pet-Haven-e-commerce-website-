import { useState } from "react";
import Sidebar from "./Sidebar";
import { IoSearchSharp } from "react-icons/io5";

const FilterSection = ({
  priceRange,
  handlePriceChange,
  categories,
  selectedCategory,
  handleCategoryChange,
  sortOrder,
  handleSorting,
  handleSearchQuery,
  searchQuery,
}) => {
  const [filterOpen, setFilterOpen] = useState(false);

  return (
    <div className="relative">

      {/* Search */}
      <div className="w-60 p-4 flex items-center gap-3">
        <label className="text-xs font-semibold uppercase text-gray-500 mb-2">
          <IoSearchSharp className="size-5"/>
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
          placeholder="Search pets..."
          className="w-full p-1.5 rounded-lg border-2 text-gray-500 border-gray-400"
        />
      </div>

      {/* Button */}
      <div>
        <button
          onClick={() => setFilterOpen(true)}
          className="w-fit mx-4 px-4 py-2 rounded-md bg-yellow-600 text-white hover:bg-yellow-700 transition mb-4"
        >
          Custom Filters
        </button>
      </div>

      {/* Sidebar */}
      <Sidebar
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        priceRange={priceRange}
        handlePriceChange={handlePriceChange}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={handleCategoryChange}
        sortOrder={sortOrder}
        handleSorting={handleSorting}
      />
    </div>
  );
};

export default FilterSection;
