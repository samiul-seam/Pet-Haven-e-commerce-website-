import { Swiper, SwiperSlide } from "swiper/react";
import CarouselSlide from "./CarouselSlide";
 
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import pet1 from "../../../assets/images/image-1.jpg";
import pet2 from "../../../assets/images/caro2.jpg";
import pet3 from "../../../assets/images/boypet.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const HeroCarousel = () => {
  const slides = [
    {
      title: "Find Your Perfect Companion",
      subtitle: "Discover loving pets waiting for their forever home",
      image: pet1,
    },
    {
      title: "Adopt Happiness Today",
      subtitle: "Give a pet a second chance at life",
      image: pet2,
    },
    {
      title: "Meet Your New Best Friend",
      subtitle: "Browse hundreds of adorable pets",
      image: pet3,
    },
  ];

  return (
    <div >
      <Swiper
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <CarouselSlide title={slide.title} subtitle={slide.subtitle} image={slide.image} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HeroCarousel;
