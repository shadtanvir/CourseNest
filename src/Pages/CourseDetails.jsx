import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { motion } from "framer-motion";
import { AuthContext } from "../Provider/AuthProvider";
import axios from "axios";
import { toast } from "react-toastify";
import Loading from "../components/Loading";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import useTitle from "../hooks/UseTitle";

const CourseDetails = () => {
  // const axiosSecure = UseAxiosSecure();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [availableSeats, setAvailableSeats] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useTitle("Course Details");
  // const token = user.getIdToken();
  // console.log(user);
  // console.log("accessToken", user?.accessToken);
  // console.log(user);

  useEffect(() => {
    const fetchData = async () => {
      const courseRes = await axios.get(`http://localhost:5000/courses/${id}`);
      setCourse(courseRes.data);
      const courseData = courseRes.data;
      setAvailableSeats(courseData.seats - courseData.totalEnrolled);
      console.log(availableSeats);

      if (user) {
        // console.log(id);
        const enrollRes = await axios.get(
          `http://localhost:5000/courses/enrollment/${id}?email=${user.email}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        setIsEnrolled(enrollRes.data.enrolled);
      }
    };

    fetchData();
  }, [id, user, availableSeats]);

  const handleEnroll = async () => {
    if (!user) return;

    try {
      const res = await axios.post(
        `http://localhost:5000/courses/${id}/enroll`,
        { email: user.email }
      );
      console.log(res.data);

      if (res.data.success) {
        setIsEnrolled(res.data.enrolled); // update state from backend
        toast.success(res.data.message);
        if (res.data.enrolled) {
          setAvailableSeats(availableSeats - 1);
        } else {
          setAvailableSeats(availableSeats + 1);
        }
        console.log(availableSeats);

        // refresh course info (seats left, totalEnrolled, etc.)
        const courseRes = await axios.get(
          `http://localhost:5000/courses/${id}`
        );
        setCourse(courseRes.data);
      } else {
        toast.warning(res.data.message || "Action failed");
      }
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error(
          "You cannot enroll in more than 3 courses at the same time."
        );
      } else {
        toast.error("Enrollment failed.");
      }
    }
  };

  if (!course) {
    return <Loading></Loading>;
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto p-6 font-poppins text-base-content"
    >
      <motion.img
        src={course?.image}
        alt={course.title}
        className="w-full h-full object-cover rounded-xl mb-6"
        whileHover={{ scale: 1.02 }}
      />
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-center text-primary">
          {course.title}
        </h1>
        <p className="text-gray-500">{course.description}</p>

        <div className="text-center grid grid-cols-2 gap-4">
          <p>
            <strong>Duration (in weeks):</strong> {course.duration}
          </p>
          <p>
            <strong>Price:</strong> ${course.price}
          </p>
          <p>
            <strong>Total Enrolled:</strong> {course.totalEnrolled}
          </p>
          <p>
            <strong>Available Seats:</strong> {availableSeats}
          </p>
          <p>
            <strong>Instructor:</strong> {course.name}
          </p>
          <p>
            <strong>Instructor Email:</strong> {course.email}
          </p>
        </div>

        {availableSeats ? (
          <button
            disabled={!user}
            onClick={handleEnroll}
            className={`btn w-full mt-6 ${
              !user
                ? "btn-disabled"
                : isEnrolled
                ? "bg-error hover:bg-red-700 text-white"
                : "bg-primary hover:bg-green-600 text-white"
            }`}
          >
            {!user
              ? "Login to Enroll"
              : isEnrolled
              ? "Unenroll"
              : `Enroll (${availableSeats} seats left)`}
          </button>
        ) : (
          <p className="text-center text-error font-semibold mt-10 text-xl">
            No seats left
          </p>
        )}

        {/* <button
          disabled={!user}
          onClick={handleEnroll}
          className={`btn w-full mt-6 ${
            !user
              ? "btn-disabled"
              : isEnrolled
              ? "bg-error hover:bg-red-700 text-white"
              : "bg-primary hover:bg-green-600 text-white"
          }`}
        >
          {!user ? "Login to Enroll" : isEnrolled ? "Unenroll" : "Enroll"}
        </button> */}
      </div>
    </motion.div>
  );
};

export default CourseDetails;
