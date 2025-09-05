import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import Loading from "../components/Loading";
import axios from "axios";
import UseAxiosSecure from "../hooks/UseAxiosSecure";
import useTitle from "../hooks/UseTitle";
import { toast } from "react-toastify";

const EditCourse = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setcourse] = useState(null);
  const navigate = useNavigate();
  const axiosSecure = UseAxiosSecure();
  useTitle("Edit Course");

  useEffect(() => {
    axios
      .get(`http://localhost:5000/courses/${id}`)
      .then((res) => setcourse(res.data));
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedcourse = {
      title: form.title.value,
      duration: form.duration.value,
      price: form.price.value,
      shortDescription: form.shortDescription.value,
      image: form.image.value,
      seats: form.seats.value,
    };

    axiosSecure
      .patch(`/courses/${id}?email=${user.email}`, updatedcourse)

      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("course updated successfully.");
          //   navigate("/my-courses");
        }
      })
      .catch((error) => {
        toast.error("Failed to update course.");
      });
  };

  if (!course)
    return (
      <div className="text-center mt-10">
        <Loading></Loading>
      </div>
    );

  return (
    <div className="max-w-2xl mx-auto p-6 bd bg-base-200 shadow-md rounded-lg mt-10">
      <h2 className="text-2xl font-bold text-primary mb-6 text-center font-poppins">
        Update your course
      </h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Title & Duration */}
        <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
          <div>
            <label className="label  text-shadow-gray-700 ">Title</label>
            <input
              type="text"
              name="title"
              defaultValue={course.title}
              placeholder="course Title"
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="label text-shadow-gray-700">
              Duration (in weeks)
            </label>
            <input
              type="number"
              name="duration"
              defaultValue={course.duration}
              placeholder="Duration of the course"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/*Banner image */}
        <div>
          <label className="label text-shadow-gray-700">
            Banner image for the course
          </label>
          <input
            type="url"
            name="image"
            defaultValue={course.image}
            placeholder="Image URL"
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* price & Seats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="label text-shadow-gray-700">Price (in usd)</label>
            <input
              type="number"
              name="price"
              defaultValue={course.price}
              placeholder="Price of the course"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div>
            <label className="label text-shadow-gray-700">Seats</label>
            <input
              type="number"
              name="seats"
              defaultValue={course.seats}
              placeholder="Total seats"
              className="input input-bordered w-full"
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="label text-shadow-gray-700">Description</label>
          <textarea
            name="shortDescription"
            defaultValue={course.shortDescription}
            placeholder="course Description"
            rows="4"
            className="textarea textarea-bordered w-full"
            required
          ></textarea>
        </div>

        <div className="text-center">
          <button className="btn btn-primary text-white px-10 mt-4">
            Update course
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCourse;
