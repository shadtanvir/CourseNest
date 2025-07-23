import React from "react";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import CoursesSection from "../components/CoursesSection";
import PopularCourses from "../components/PopularCourses";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <CoursesSection></CoursesSection>
      <PopularCourses></PopularCourses>
      <Testimonials></Testimonials>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
