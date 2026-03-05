import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import PetCard from "./PetCard";
import useSimpleFetchPets from "../../../hooks/useSimpleFetchPets";
import { Link } from "react-router";
 
const FreePets = () => {
  const { pets, isLoading } = useSimpleFetchPets();

  return (
    <div className="mx-auto max-w-5/6 py-12">
      <div className="flex justify-between items-center md:px-8 mb-6 ">
        <h2 className="text=2xl md:text-3xl font-bold text-teal-500">
          Free Pets
        </h2>
        <Link
          to="/shop?type=free"
          className="bg-teal-300 px-3 py-1 rounded-full text-teal-700"
        >
          View all
        </Link>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center mt-6">
          <span className="loading loading-spinner loading-xl text-info"></span>
        </div>
      )}
      <div>
        <Swiper
          modules={[Navigation]}
          spaceBetween={10}
          slideperview={1}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          navigation
          className="mt-4 px-5 container"
        >
          {pets
            .filter((pet) => pet.price === 0)
            .map((pet, index) => (
              <SwiperSlide key={index} className="flex justify-between">
                <PetCard pet={pet} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
};

export default FreePets;
