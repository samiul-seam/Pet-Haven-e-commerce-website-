import { useEffect, useState } from "react";
 
const Sidebar = ({
  priceRange,
  handlePriceChange,
  categories,
  selectedCategory,
  handleCategoryChange,
  sortOrder,
  handleSorting,
  filterOpen,
  setFilterOpen,
}) => {
  const [tempFilters, setTempFilters] = useState({
    priceRange: { min: 0, max: 30000 },
    category: "",
    sort: "",
  });

  useEffect(() => {
    if (filterOpen) {
      setTempFilters({
        priceRange: priceRange || { min: 0, max: 30000 },
        category: selectedCategory || "",
        sort: sortOrder || "",
      });
    }
  }, [filterOpen, priceRange, selectedCategory, sortOrder]);

  const handleApply = () => {
    if (tempFilters.priceRange.min > tempFilters.priceRange.max) return;

    handlePriceChange(tempFilters.priceRange);
    handleCategoryChange(tempFilters.category);
    handleSorting(tempFilters.sort);
    setFilterOpen(false);
  };

  const handleCancel = () => {
    setFilterOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          filterOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={handleCancel}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 ${
          filterOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full text-gray-700">
          <h2 className="text-xl text-orange-600 font-bold mb-6 border-b pb-2">
            Filter Options
          </h2>

          <div className="flex flex-col">
            {/* Price */}
            <div className="mb-6">
              <label className="text-md font-medium mb-2 block">
                Price Range
              </label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={tempFilters.priceRange.min}
                  onChange={(e) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      priceRange: {
                        ...prev.priceRange,
                        min: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full border rounded p-2"
                />
                <input
                  type="number"
                  value={tempFilters.priceRange.max}
                  onChange={(e) =>
                    setTempFilters((prev) => ({
                      ...prev,
                      priceRange: {
                        ...prev.priceRange,
                        max: Number(e.target.value),
                      },
                    }))
                  }
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            {/* Category */}
            <div className="mb-6">
              <label className="text-xs font-semibold uppercase text-gray-500 mb-2 block">
                Category
              </label>
              <select
                value={tempFilters.category}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    category: e.target.value,
                  }))
                }
                className="w-full p-2.5 border rounded-lg"
              >
                <option value="">All Categories</option>
                {categories?.map((cat) => (
                  <option key={cat.id} value={cat.id} className="text-gray-500">
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="mb-6">
              <label className="text-xs font-semibold uppercase text-gray-500 mb-2 block">
                Sort
              </label>
              <select
                value={tempFilters.sort}
                onChange={(e) =>
                  setTempFilters((prev) => ({
                    ...prev,
                    sort: e.target.value,
                  }))
                }
                className="w-full p-2.5 border rounded-lg"
              >
                <option value="">Default</option>
                <option value="price">Low to High</option>
                <option value="-price">High to Low</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-auto flex flex-col gap-2">
            <button
              onClick={handleApply}
              className="py-2.5 bg-orange-500 text-white rounded-md hover:bg-white hover:text-orange-500 border-2 hover:border-orange-500"
            >
              Apply Changes
            </button>
            <button
              onClick={handleCancel}
              className="py-2.5 text-gray-500 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;