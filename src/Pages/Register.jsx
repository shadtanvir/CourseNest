import React, { use, useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, setUser, updateUser, googleSignIn } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const validatePassword = (password, confirmPassword, email) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    if (password.includes(email)) {
      toast.error("Password should not contain your email.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    toast.success("Successfully Registered!");
  };

  const handleGoogleRegister = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // console.log(user);
        const userProfile = {
          email: user.email,
          name: user.displayName,
          photoURL: user.photoURL,
          age: null,
          gender: null,
          status: "Active",
          experience: "",
          creationTime: user?.metadata?.creationTime,
          lastSignInTime: user?.metadata?.lastSignInTime,
          totalSharedTips: 0,
          likedTips: [],
        };

        // check if user already exists in MongoDB
        fetch(
          `https://green-circle-server-mocha.vercel.app/gardeners?email=${user.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.exists) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You have already signed up with Google. Please log in.",
              });
            } else {
              // save new gardener to MongoDB
              fetch("https://green-circle-server-mocha.vercel.app/gardeners", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                },
                body: JSON.stringify(userProfile),
              })
                .then((res) => res.json())
                .then((data) => {
                  if (data.insertedId) {
                    Swal.fire({
                      icon: "success",
                      title: "Your account is created.",
                      showConfirmButton: false,
                      timer: 1500,
                    });
                    setUser(user);
                    navigate(location.state?.from || "/");
                  }
                });
            }
          });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.message}`,
        });
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const name = form.name.value;
    const photoUrl = form.photoUrl.value;

    const { email, password, confirmPassword, ...restFormData } =
      Object.fromEntries(formData.entries());
    // password validation
    validatePassword(password, confirmPassword, email);
    // console.log(name, email, password, photoUrl);

    createUser(email, password)
      .then((result) => {
        const userProfile = {
          email,
          ...restFormData,
          creationTime: result.user?.metadata?.creationTime,
          lastSignInTime: result.user?.metadata?.lastSignInTime,
          totalSharedTips: 0,
          likedTips: [],
        };

        // save profile info in the db
        fetch("https://green-circle-server-mocha.vercel.app/gardeners", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(userProfile),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.insertedId) {
              Swal.fire({
                icon: "success",
                title: "Your account is created.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
        navigate(location.state?.from || "/");
        const user = result.user;
        updateUser({ displayName: name, photoURL: photoUrl })
          .then(() => {
            // setUser(user);
            setUser({ ...user, displayName: name, photoURL: photoUrl });
          })
          .catch((error) => {
            // An error occurred
            setUser(user);
          });
        // console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        // setError(errorCode);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errorCode}`,
          //   footer: '<a href="#">Why do I have this issue?</a>',
        });
        // alert(errorMessage);
        // ..
      });
  };
  return (
    <div className="flex justify-center items-center min-h-screen font-inter">
      <div className="card bg-base-200 w-full max-w-sm shrink-0 shadow-2xl py-5">
        <h2 className="font-semibold font-poppins text-2xl text-primary text-center">
          Register your account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset className="fieldset">
            {/* Name */}
            <label className="label text-shadow-gray-700">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
              required
            />
            {/* email */}
            <label className="label text-shadow-gray-700">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            {/* Photo URL */}
            <label className="label text-shadow-gray-700">Photo URL</label>
            <input
              name="photoUrl"
              type="text"
              className="input"
              placeholder="Photo URL"
              required
            />

            {/* Age
            <label className="label text-shadow-gray-700">Age</label>
            <input
              name="age"
              type="number"
              min="10"
              className="input"
              required
            /> */}

            {/* Gender
            <label className="label text-shadow-gray-700">Gender</label>
            <select name="gender" className="select select-bordered" required>
              <option value="" disabled selected>
                Select gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select> */}

            {/* Status
            <label className="label text-shadow-gray-700">Status</label>
            <select name="status" className="select select-bordered" required>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select> */}

            {/* Experience
            <label className="label text-shadow-gray-700">Experience</label>
            <input
              name="experience"
              type="text"
              className="input"
              placeholder="E.g. 3 years in rooftop gardening"
              required
            /> */}

            {/* password */}
            <label className="label text-shadow-gray-700">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
              required
            />
            {/* Confirm password */}
            <label className="label text-shadow-gray-700">
              Confirm Password
            </label>
            <input
              name="confirmPassword"
              type="password"
              className="input"
              placeholder="Confirm Password"
              required
            />

            <button
              type="submit"
              className="btn bg-primary text-white font-merriWeather mt-4"
            >
              Register
            </button>
            <p className="font-semibold text-center pt-5">
              Already have an account?{" "}
              <Link className="text-primary" to="/auth/login">
                Login
              </Link>{" "}
            </p>
            {/* Google */}
            <button
              onClick={handleGoogleRegister}
              className="btn bg-white text-black font-merriWeather border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              Register with Google
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
