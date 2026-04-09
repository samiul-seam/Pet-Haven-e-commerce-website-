import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import CategoryItem from "./CategoryItem";
import useFetchCategory from "../../../hooks/useFetchCategory";
import Img from "../../../assets/images/services-image-1.png";
import preLoader from "../../../assets/images/preloader.gif";

const Categories = () => {
  const { categories, isLoading } = useFetchCategory();

  return (
    <div className="w-full relative py-20 min-h-150">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          src={Img}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {isLoading ? (
        <div className="relative z-10 flex flex-col items-center justify-center">
          <img src={preLoader} alt="Loading..." className="w-20 h-20" />
          <p className="text-white mt-4 font-medium tracking-widest uppercase">
            Loading Categories...
          </p>
        </div>
      ) : (
        <div className="container mx-auto relative z-10 px-4 md:px-20">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              640: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-16"
          >
            {categories.map((category, index) => (
              <SwiperSlide key={category.id} className="grid grid-cols-2">
                <CategoryItem category={category} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination flex justify-center gap-2 mt-4"></div>
        </div>
      )}
    </div>
  );
};

export default Categories;
