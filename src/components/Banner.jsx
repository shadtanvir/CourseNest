import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";

const bannerSlides = [
  {
    title: "Master New Skills",
    subtitle: "Join thousands of learners across the globe",
    image:
      "https://nypost.com/wp-content/uploads/sites/2/2020/08/graduate-wage-gap.jpg?quality=75&strip=all",
  },
  {
    title: "Grow Your Career",
    subtitle: "Find the perfect course tailored just for you",
    image:
      "https://cdn.prod.website-files.com/5d26256b528d2e079bc08d82/652eecade5901ca6739c7ed6_pexels-olia-danilevich-8145335.jpg",
  },
  {
    title: "Learn From Experts",
    subtitle: "Top instructors with real-world experience",
    image:
      "https://cdn.elearningindustry.com/wp-content/uploads/2018/10/20-free-courses-on-desing-and-development-you-should-know-about-1024x574.jpg",
  },
];

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div className="w-full overflow-hidden font-poppins">
      <Slider {...settings}>
        {bannerSlides.map((slide, index) => (
          <div key={index} className="relative h-[700px]">
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Black Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-black/40"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
              <motion.h1
                className="text-4xl md:text-5xl font-bold mb-4"
                initial={{ y: -60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: false }}
              >
                {slide.title}
              </motion.h1>
              <motion.p
                className="text-lg md:text-xl font-inter"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: false }}
              >
                {slide.subtitle}
              </motion.p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Banner;
