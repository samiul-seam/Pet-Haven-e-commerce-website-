const FilterSection = ({
  priceRange,
  handlePriceChange,
  categories,
  selectedCategory,
  handleCategoryChange,
  searchQuery,
  handleSearchQuery,
  sortOrder,
  handleSorting,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 text-slate-600 shadow-md">
      {/* Price Range */}
      <div className="bg-white p-4 rounded-lg shadow">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="flex justify-between p-1">
          <div>
            <input
              type="number"
              name="min"
              step="50"
              min="0"
              max={priceRange.max}
              value={priceRange.min}
              onChange={(e) =>
                handlePriceChange({
                  ...priceRange,
                  min: Number(e.target.value),
                })
              }
              className="border border-cyan-300 rounded px-7 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div>
            <input
              type="number"
              name="max"
              step="50"
              max="30000"
              min={priceRange.min}
              value={priceRange.max}
              onChange={(e) =>
                handlePriceChange({
                  ...priceRange,
                  max: Number(e.target.value),
                })
              }
              className="border border-cyan-300 rounded px-7 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </div> 
      </div>

      {/* Category */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Category
        </label>
        <select
          className="w-full p-2.5 bg-gray-50 border border-cyan-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Search
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
          placeholder="Search pets..."
          className="w-full p-2.5 bg-gray-50 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all"
        />
      </div>

      {/* Sorting */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Sort By Price
        </label>
        <select
          className="w-full p-2.5 bg-gray-50 border border-cyan-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 outline-none transition-all"
          value={sortOrder}
          onChange={(e) => handleSorting(e.target.value)}
        >
          <option value="">Default</option>
          <option value="price">Price: Low to High</option>
          <option value="-price">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
