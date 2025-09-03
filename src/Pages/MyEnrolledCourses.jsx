import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Swal from "sweetalert2";
import useTitle from "../hooks/UseTitle";

const MyEnrolledCourses = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = UseAxiosSecure();
  const [courses, setCourses] = useState([]);
  useTitle("Enrolled Courses");

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure
        .get(`/enrollments?email=${user.email}`)
        .then((res) => setCourses(res.data))
        .catch((err) => console.error(err));
    }
  }, [loading, user, axiosSecure]);

  const handleRemoveEnrollment = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be unenrolled from this course.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, remove me!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/enrollments/${id}?email=${user.email}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              setCourses((prev) => prev.filter((c) => c._id !== id));
              Swal.fire(
                "Removed!",
                "You are unenrolled from this course.",
                "success"
              );
            }
          })
          .catch((err) => {
            Swal.fire("Error!", "Failed to remove enrollment.", "error");
          });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-10 p-4 font-inter">
      <h2 className="text-3xl font-bold text-primary mb-6 text-center font-poppins">
        My Enrolled Courses
      </h2>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-base-200">
        <table className="table w-full text-sm">
          <thead className="bg-base-200 font-poppins text-primary">
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Short Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr key={course._id} className="bg-base-100">
                <td>{index + 1}</td>
                <td className="font-semibold text-primary">{course.title}</td>
                <td className="italic text-secondary">
                  {course.shortDescription}
                </td>
                <td>
                  <button
                    onClick={() => handleRemoveEnrollment(course._id)}
                    className="btn btn-sm btn-error text-white"
                  >
                    Remove Enrollment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && courses.length === 0 && (
          <div className="text-center py-6 text-secondary">
            You are not enrolled in any courses yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default MyEnrolledCourses;
