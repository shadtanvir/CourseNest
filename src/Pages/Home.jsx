import React from "react";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import LatestCourse from "../components/LatestCourse";
import PopularCourses from "../components/PopularCourses";
import Testimonials from "../components/Testimonials";
import WhyChooseUs from "../components/WhyChooseUs";
import useTitle from "../hooks/UseTitle";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      <Banner></Banner>
      <LatestCourse></LatestCourse>
      <PopularCourses></PopularCourses>
      <Testimonials></Testimonials>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
};

export default Home;
