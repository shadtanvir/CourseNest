import React, { use, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";
import { useForm } from "react-hook-form";
import { div } from "framer-motion/client";
import axios from "axios";
import useTitle from "../hooks/UseTitle";

const AddCourse = () => {
  const { user } = useContext(AuthContext);
  useTitle("Add Course");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const courseData = {
      ...data,
      addedAt: new Date(),
      totalEnrolled: 0,
      email: user.email,
      name: user.displayName,
      enrollments: [],
    };

    axios.post("http://localhost:5000/add-course", courseData).then((res) => {
      console.log(res.data);
      if (res.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Your course is added!",
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to add the course!",
        });
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto my-20 p-6 font-inter bg-base-200 shadow-lg rounded-md">
      <h2 className="text-2xl font-poppins font-bold text-primary mb-6">
        Launch your course
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 font-inter">
        <div>
          <label className="label">Title</label>
          <input
            {...register("title", { required: true })}
            type="text"
            className="input input-bordered w-full"
            placeholder="Tilte of the course"
          />
        </div>

        <div>
          <label className="label">Description</label>
          <textarea
            {...register("shortDescription", { required: true })}
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Describe your course shortly here..."
          />
        </div>

        <div>
          <label className="label">Banner image for the course</label>
          <input
            {...register("image", { required: true })}
            type="url"
            className="input input-bordered w-full"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div>
          <label className="label">Duration (in weeks)</label>
          <input
            {...register("duration", { required: true })}
            type="number"
            className="input input-bordered w-full"
            placeholder="Duration of the course in weeks"
          />
        </div>
        <div>
          <label className="label">Price (in usd)</label>
          <input
            {...register("price", { required: true })}
            type="number"
            className="input input-bordered w-full"
            placeholder="Price in bdt"
          />
        </div>
        <div>
          <label className="label">Seats</label>
          <input
            {...register("seats", { required: true })}
            type="number"
            className="input input-bordered w-full"
            placeholder="Total seats"
          />
        </div>

        <div className="text-right">
          <button className="btn btn-primary text-white" type="submit">
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
