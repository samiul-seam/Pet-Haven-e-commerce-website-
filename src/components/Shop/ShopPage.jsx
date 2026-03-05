import { useEffect, useState } from "react";
import useFetchCategory from "../../hooks/useFetchCategory";
import useFetchPet from "../../hooks/useFetchPet";
import FilterSection from "./FilterSection";
import ShopCard from "./ShopCard";
import Pagination from "./Pagination";
import { useSearchParams } from "react-router-dom";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [priceRange, setPriceRange] = useState(() => {
    const type = searchParams.get("type");
    if (type === "free") return { min: 0, max: 0 };
    if (type === "premium") return { min: 1, max: 20000 };
    return { min: 0, max: 20000 };
  });

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || ""
  );


  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleReset = () => {
    setSearchParams({});
    setSelectedCategory("");
    setSearchQuery("");
    setSortOrder("");
    setPriceRange({ min: 0, max: 20000 });
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, priceRange, searchQuery, sortOrder]);

  const { pets, isLoading, error, totalPage } = useFetchPet(
    selectedCategory,
    sortOrder,
    currentPage,
    priceRange,
    searchQuery,
  );

  const { categories } = useFetchCategory();

  return (
    <div className="w-full mx-auto py-5 px-3">
      <div className="flex justify-between mx-4 items-center">
        <h1 className="text-3xl font-bold mb-6 text-slate-700">
          Shop Your Pet
        </h1>
        <button
          onClick={handleReset}
          className="bg-teal-500 hover:bg-teal-600 px-3 py-2 rounded text-white"
        >
          Show all
        </button>
      </div>
      <FilterSection
        priceRange={priceRange}
        handlePriceChange={setPriceRange}
        categories={categories}
        selectedCategory={selectedCategory}
        handleCategoryChange={setSelectedCategory}
        handleSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        sortOrder={sortOrder}
        handleSorting={setSortOrder}
      />

      {isLoading && (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-xl text-info"></span>
        </div>
      )}

      {error && <p className="text-red-500">Error fetching pets</p>}

      {
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen">
          {pets.map((pet) => (
            <ShopCard key={pet.id} pet={pet} />
          ))}
        </div>
      }
      {
        <Pagination
          totalPages={totalPage}
          currentPage={currentPage}
          handlePageChange={setCurrentPage}
        />
      }
    </div>
  );
};

export default ShopPage;
