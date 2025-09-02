import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import Swal from "sweetalert2";
import { FaEdit, FaTrashAlt, FaLock, FaUnlock } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";

const ManageCourses = () => {
  const { user, loading } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  console.log(user);
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure
        .get(`/course-by?email=${user.email}`)
        .then((res) => setCourses(res.data));
    }
  }, [loading, user, axiosSecure]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This course will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/courses/${id}?email=${user.email}`).then((res) => {
          if (res.data.deletedCount > 0) {
            setCourses((prev) => prev.filter((course) => course._id !== id));
            Swal.fire("Deleted!", "Your course has been deleted.", "success");
          }
        });
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto my-15 p-4 font-inter">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-2 font-poppins">
          Manage your courses
        </h2>
        <p className="text-base-300 ">All your courses are listed here.</p>
      </div>

      <div className="overflow-x-auto shadow-lg rounded-lg border border-green-200">
        <table className="table w-full text-sm">
          <thead className="bg-blue-200 font-poppins text-green-800">
            <tr className="text-primary font-semibold">
              <th className="py-3 px-4 text-left">#</th>
              <th className="py-3 px-4 text-left">Title</th>
              <th className="py-3 px-4 text-left">Short Description</th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course, index) => (
              <tr
                key={course._id}
                className=" bg-base-100 transition duration-150"
              >
                <td className="py-2 px-4 font-medium">{index + 1}</td>
                <td className="py-2 px-4 flex items-center gap-2 font-semibold text-primary">
                  {course.title}
                </td>
                <td className="py-2 px-4 italic text-neutral">
                  {course.shortDescription}
                </td>

                <td className=" flex gap-2 py-2 px-4">
                  <Link to={`/update-course/${course._id}`}>
                    <button className="btn btn-sm btn-warning flex items-center gap-1">
                      <FaEdit /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="btn btn-sm btn-error flex items-center gap-1"
                  >
                    <FaTrashAlt /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && courses.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            You haven’t added any courses yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCourses;
