import Img from "../../assets/images/image-1.jpg";
import preLoader from "../../assets/images/preloader.gif";
import { Link } from "react-router";
import PetCard from "./PetCard";
import { useEffect, useState } from "react";
import Pagination from "../Shop/Pagination";
import useSimpleFetchPets from "../../hooks/useSimpleFetchPets";

const Pets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");

  const { pets, isLoading, totalPage } = useSimpleFetchPets(currentPage);

  const filterPets =
    filter === "free"
      ? pets.filter((pet) => pet.price === 0)
      : filter === "paid"
        ? pets.filter((pet) => pet.price > 0)
        : pets;

  useEffect(() => {
    setCurrentPage(1);
  }, [setFilter]);

  if (!pets) {
    return (
      <p className="text-center mt-10 text-gray-500">
        You have not added any pets yet.
      </p>
    );
  }

  return (
    <div>
      <div className="w-full min-h-50 relative overflow-hidden flex items-center">
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
            PETS
          </h1>

          <div className="flex items-center border border-gray-400/60 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-sm font-medium">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              HOME
            </Link>
            <span className="mx-2 text-gray-300">/</span>
            <span className="text-gray-100 font-semibold">Pets</span>
          </div>
        </div>
      </div>

      <div className="p-6 relative">
        <div className="container mx-auto flex justify-end mb-4">
          <select
            className="text-gray-600 border border-gray-300 rounded-2xl px-3 py-2"
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Pets</option>
            <option value="free">Free Pets</option>
            <option value="paid">Paid Pets</option>
          </select>
        </div>

        {isLoading ? (
          <div className="relative h-screen z-10 flex flex-col items-center justify-center">
            <img src={preLoader} alt="Loading..." className="w-20 h-20" />
          </div>
        ) : pets.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filterPets.map((pet) => (
              <PetCard key={pet.id} pet={pet} />
            ))}
          </div>
        ) : (
          <div className="container mx-auto flex flex-col items-center justify-center min-h-[50vh]">
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-2xl border border-white/20 text-center">
              <h1 className="text-gray-600 text-2xl font-bold">
                No Pets Available
              </h1>
            </div>
          </div>
        )}
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

export default Pets;
