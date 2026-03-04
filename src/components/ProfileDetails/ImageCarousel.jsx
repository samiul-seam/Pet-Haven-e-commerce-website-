import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const ImageCarousel = ({ setShowImageId, pet }) => {
  const handleClick = (id) => {
    setShowImageId(id);
  };

  return (
    <div>
      <div className="w-full">
        <Swiper
          slidesPerView={3}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
        >
          {pet.images.map((item, index) => (
            <SwiperSlide key={index} className="mySwiper">
              <div
                onClick={() => handleClick(index)}
                className="aspect-square bg-slate-100 rounded-lg cursor-pointer border-2 border-transparent hover:border-primary overflow-hidden"
              >
                <img
                  src={item.image}
                  className="object-cover w-full h-full"
                  alt={`pet thumbnail `}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ImageCarousel;
