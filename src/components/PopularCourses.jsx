import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import axios from "axios";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/courses/top-enrolled")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.error("Failed to load courses", err);
      });
  }, []);
  return (
    <section className="py-16 bg-base-100 font-poppins">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-primary">
          Popular Courses
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: false }}
              className="card bg-base-200 shadow-xl"
            >
              <figure className="h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="text-xl font-semibold text-primary">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-500">
                  Total enrolled: {course.totalEnrolled}
                </p>

                {/* Optional: show price, instructor, or seats */}
                {course.instructor && (
                  <p className="text-sm text-gray-600">
                    Instructor: {course.instructor}
                  </p>
                )}
                {course.price && (
                  <p className="text-sm font-semibold text-primary">
                    Price: ${course.price}
                  </p>
                )}

                <div className="mt-4">
                  <Link
                    to={`/courses/${course._id}`}
                    className="btn btn-sm bg-primary text-white hover:bg-green-600"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
