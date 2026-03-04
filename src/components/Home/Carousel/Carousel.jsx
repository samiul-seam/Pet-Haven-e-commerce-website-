import { Swiper, SwiperSlide } from "swiper/react";
import CarouselSlide from "./CarouselSlide";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import dog1 from "../../../assets/images/dog1.jpg";
import dog2 from "../../../assets/images/dog2.jpg";
import cat1 from "../../../assets/images/cat1.jpg";
import cat2 from "../../../assets/images/cat2.jpg";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

const HeroCarousel = () => {
  const slides = [
    {
      title: "Find Your Perfect Companion",
      subtitle: "Discover loving pets waiting for their forever home",
      image: dog1,
    },
    {
      title: "Adopt Happiness Today",
      subtitle: "Give a pet a second chance at life",
      image: cat1,
    },
    {
      title: "Meet Your New Best Friend",
      subtitle: "Browse hundreds of adorable pets",
      image: dog2,
    },
    {
      title: "Love. Care. Adopt.",
      subtitle: "Start your adoption journey now",
      image: cat2,
    },
  ];

  return (
    <div >
      <Swiper
        autoplay={{
          delay: 4000,
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
