import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useTitle from "../hooks/UseTitle";

const Register = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  useTitle("Register");
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
        };

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
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${errorCode}`,
        });
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
              className="btn bg-primary text-white font-poppins mt-4"
            >
              Register
            </button>
            <p className="font-semibold text-center pt-5">
              Already have an account?{" "}
              <Link className="text-primary" to="/auth/login">
                Login
              </Link>{" "}
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
