import React from "react";
import Loading from "../components/Loading";
import Banner from "../components/Banner";
import CoursesSection from "../components/CoursesSection";
import PopularCourses from "../components/PopularCourses";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <CoursesSection></CoursesSection>
      <PopularCourses></PopularCourses>
    </div>
  );
};

export default Home;
