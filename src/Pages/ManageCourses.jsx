import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AuthContext } from "../Provider/AuthProvider";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const ManageCourses = () => {
  const { user, loading } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null); // course to delete
  const axiosSecure = UseAxiosSecure();

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure
        .get(`/course-by?email=${user.email}`)
        .then((res) => setCourses(res.data));
    }
  }, [loading, user, axiosSecure]);

  // Delete handler
  const confirmDelete = async () => {
    if (!selectedCourse) return;

    try {
      const res = await axiosSecure.delete(
        `/courses/${selectedCourse._id}?email=${user.email}`
      );
      if (res.data.deletedCount > 0) {
        setCourses((prev) =>
          prev.filter((course) => course._id !== selectedCourse._id)
        );
        setSelectedCourse(null); // close modal
        Swal.fire("Deleted!", "Your course has been deleted.", "success");
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto my-15 p-4 font-inter">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary flex justify-center items-center gap-2 font-poppins">
          Manage your courses
        </h2>
        <p className="text-base-300">All your courses are listed here.</p>
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
                className="bg-base-100 transition duration-150"
              >
                <td className="py-2 px-4 font-medium">{index + 1}</td>
                <td className="py-2 px-4 font-semibold text-primary">
                  {course.title}
                </td>
                <td className="py-2 px-4 italic text-neutral">
                  {course.shortDescription}
                </td>
                <td className="flex gap-2 py-2 px-4">
                  <Link to={`/update-course/${course._id}`}>
                    <button className="btn btn-sm btn-warning flex items-center gap-1">
                      <FaEdit /> Edit
                    </button>
                  </Link>
                  <button
                    onClick={() => setSelectedCourse(course)}
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

      {/*Confirm Delete Modal */}
      {selectedCourse && (
        <dialog id="delete_modal" className="modal modal-open">
          <div className="modal-box bg-base-200">
            <h3 className="font-bold text-lg text-error font-poppins">
              Confirm Delete
            </h3>
            <p className="py-4 text-base-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-primary">
                {selectedCourse.title}
              </span>{" "}
              course? This action cannot be undone.
            </p>
            <div className="modal-action">
              <button
                onClick={confirmDelete}
                className="btn btn-error text-white"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setSelectedCourse(null)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default ManageCourses;
