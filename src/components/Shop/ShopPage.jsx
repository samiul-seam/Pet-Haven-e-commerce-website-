import { useEffect, useState } from "react";
import useFetchCategory from "../../hooks/useFetchCategory";
import useFetchPet from "../../hooks/useFetchPet";
import FilterSection from "./FilterSection";
import ShopCard from "./ShopCard";
import Pagination from "./Pagination";
import { Link, useSearchParams } from "react-router-dom";
import preLoader from "../../assets/images/preloader.gif";
import Img from "../../assets/images/image-1.jpg";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [priceRange, setPriceRange] = useState(() => {
    const type = searchParams.get("type");
    if (type === "free") return { min: 0, max: 0 };
    if (type === "premium") return { min: 1, max: 20000 };
    return { min: 0, max: 20000 };
  });

  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "",
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

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
  }, [selectedCategory, priceRange, sortOrder]);

  // search is working before finishing the word ( solved )
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 1500);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { pets, isLoading, error, totalPage } = useFetchPet(
    selectedCategory,
    sortOrder,
    currentPage,
    priceRange,
    debouncedSearch,
  );

  const { categories } = useFetchCategory();

  return (
    <div>
      <div className="w-full min-h-50 relative overflow-hidden flex items-center">
        {/* Background Image */}
        <img
          src={Img}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Content */}
        <div className="relative z-20 w-full flex justify-evenly items-center text-white">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            SHOP
          </h1>

          <div className="flex items-center border border-gray-400/60 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              HOME
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-100 font-semibold">Shop</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-5 px-3">
        <div className="flex justify-between mx-4 items-center">
          <h1 className="text-3xl font-bold mb-6 text-slate-700">
            Shop Your Pet
          </h1>
          <button
            onClick={handleReset}
            className="bg-yellow-600 hover:bg-yellow-700 transition px-3 py-2 rounded text-white"
          >
            Show all
          </button>
        </div>

        <div>
          <FilterSection
            priceRange={priceRange}
            handlePriceChange={setPriceRange}
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            handleSearchQuery={setSearchQuery}
            sortOrder={sortOrder}
            handleSorting={setSortOrder}
          />
        </div>

        {isLoading ? (
          <div className="relative h-screen z-10 flex flex-col items-center justify-center">
            <img src={preLoader} alt="Loading..." className="w-20 h-20" />
          </div>
        ) : pets && pets.length > 0 ? (
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 min-h-screen">
            {pets.map((pet) => (
              <ShopCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="container mx-auto flex flex-col items-center justify-center min-h-[50vh]">
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20 text-center">
              <h1 className="text-white text-2xl font-bold">
                No Pets Available
              </h1>
              <p className="text-gray-600 mt-2">
                Check back later or try a different filter!
              </p>
            </div>
          </div>
        )}

        {error && <p className="text-red-500">Error fetching pets</p>}

        {
          <Pagination
            totalPages={totalPage}
            currentPage={currentPage}
            handlePageChange={setCurrentPage}
          />
        }
      </div>
    </div>
  );
};

export default ShopPage;
