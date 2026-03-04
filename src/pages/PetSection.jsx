import { useEffect, useState } from "react";
import PetList from "../components/dashboard/Pets/PetList";
import useFetchPet from "../hooks/useFetchPet";
import FilterSection from "../components/dashboard/Pets/FilterSection";
import useFetchCategory from "../hooks/useFetchCategory";
import PageFilter from "../components/dashboard/Pets/PageFilter";
import { Link } from "react-router";

const PetSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder] = useState("");
  const [priceRange] = useState({ min: 0, max: 50000 });

  const { pets, isLoading, totalPage } = useFetchPet(
    selectedCategory,
    sortOrder,
    currentPage,
    priceRange,
    searchQuery,
  );

  const { categories } = useFetchCategory();

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  return (
    <div className="bg-slate-200 rounded-xl border border-slate-300 shadow-md shadow-slate-300 overflow-hidden">
      <div className="p-6 border border-slate-50">
        <div className="flex justify-between items-center">
          <h3 className="text-2xl font-semibold mb-4 text-slate-500">
            All pets
          </h3>
          <button className="text-teal-600 hover:underline cursor-pointer hover:text-teal-500">
            <Link to={"/dashboard/pets/add"}>Add Pets</Link>
          </button>
        </div>
        <FilterSection
          categories={categories}
          handleCategoryChange={setSelectedCategory}
          selectedCategory={selectedCategory}
          handleSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <div className="overflow-x-auto shadow-md shadow-slate-600">
          <table className="table w-full ">
            <thead className="bg-slate-300  text-slate-500 uppercase text-sm">
              <tr>
                <th className="py-4">Pet Id</th>
                <th className="py-4">Pet Name</th>
                <th className="py-4">Category</th>
                <th className="py-4">Breed</th>
                <th className="py-4">Price</th>
                <th className="py-4">Adopted</th>
              </tr>
            </thead>

            {!isLoading &&
              pets.map((pet) => <PetList key={pet.id} pet={pet} />)}
          </table>
          {isLoading && (
            <div className="flex justify-center items-center h-64">
              <span className="loading loading-spinner loading-xl text-info"></span>
            </div>
          )}
        </div>
        <PageFilter
          totalPages={totalPage}
          currentPage={currentPage}
          handlePageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PetSection;
