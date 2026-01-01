import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const images = [
  "https://i.ibb.co/Z6kJVWq4/pexels-gabby-k-6237989.jpg",
  "https://i.ibb.co/60Tp09Cj/pexels-armin-rimoldi-5553921.jpg",
  "https://i.ibb.co/PZ83Nd0B/pexels-zen-chung-5538346.jpg",
  "https://i.ibb.co/nsv7wvP4/pexels-zen-chung-5537505.jpg",
  "https://i.ibb.co/zW60H2Kh/pexels-charlotte-may-5965568.jpg",
  "https://i.ibb.co/35DTKyTn/pexels-gabby-k-6282020.jpg",
  "https://i.ibb.co/C5QX9g24/pexels-yaroslav-shuraev-9489917.jpg",
  "https://i.ibb.co/zVBc0zLs/pexels-tima-miroshnichenko-6550403.jpg",
];

const Banner = () => {
  return (
    <div className="2xl:w-[1536px] lg:px-10 mx-auto">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ dynamicBullets: true }}
        autoplay={{
          delay: 4000, 
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        slidesPerView={1}
        className="lg:h-[600px] h-[200px]"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="w-full h-full object-cover rounded-sm"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
