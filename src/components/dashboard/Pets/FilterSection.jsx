const FilterSection = ({
  categories,
  selectedCategory,
  handleCategoryChange,
  searchQuery,
  handleSearchQuery
}) => {
  return (
    // category 
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
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
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
          Search
        </label>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
          placeholder="Search pets..."
          className="w-full p-2.5 text-black bg-gray-50 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none transition-all"
        />
      </div>
    </div>
  );
};

export default FilterSection;
