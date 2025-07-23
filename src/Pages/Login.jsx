import React, { useState, useRef, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { ImGithub } from "react-icons/im";

const Login = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const passwordRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const { signIn, googleSignIn, githubSignIn, setUser } =
    useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        const loginInfo = {
          email,
          lastSignInTime: user?.metadata?.lastSignInTime,
        };

        fetch("https://green-circle-server-mocha.vercel.app/gardeners", {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(loginInfo),
        });

        Swal.fire({
          icon: "success",
          title: "Logged in successfully!",
          showConfirmButton: false,
          timer: 1500,
        });

        setUser(user);
        navigate(location.state?.from || "/");
      })
      .catch((error) => {
        toast.error(`Login failed: ${error.code}`);
      });
  };

  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;

        fetch(
          `https://green-circle-server-mocha.vercel.app/gardeners?email=${user.email}`
        )
          .then((res) => res.json())
          .then((data) => {
            if (!data.exists) {
              toast.error("Please sign up with Google first.");
            } else {
              setUser(user);
              Swal.fire({
                icon: "success",
                title: "Logged in via Google!",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate(location.state?.from || "/");
            }
          });
      })
      .catch((err) => toast.error(err.code));
  };

  const handleGitHubLogin = () => {
    githubSignIn()
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          icon: "success",
          title: "Logged in via GitHub!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location.state?.from || "/");
      })
      .catch((err) => toast.error(err.code));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200 font-poppins">
      <div className="card bg-base-100 w-full max-w-sm shadow-xl p-6">
        <h2 className="text-center text-2xl font-semibold text-primary mb-4 font-inter">
          Login to your account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                ref={passwordRef}
                placeholder="Enter your password"
                className="input input-bordered w-full"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-lg cursor-pointer text-gray-500"
              >
                {showPassword ? (
                  <IoMdEyeOff size={22} />
                ) : (
                  <IoMdEye size={22} />
                )}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-full text-white font-inter mt-2"
          >
            Login
          </button>

          <p className="text-center font-medium text-sm">
            Don’t have an account?{" "}
            <Link
              to="/auth/register"
              state={{ from: location.state?.from || "/" }}
              className="text-primary"
            >
              Register
            </Link>
          </p>
        </form>

        <div className="divider">OR</div>

        {/* Social Login Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleGoogleLogin}
            className="btn w-full bg-white text-black border"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/281/281764.png"
              alt="google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>

          <button
            onClick={handleGitHubLogin}
            className="btn w-full bg-black text-white"
          >
            <ImGithub size={21} />
            Continue with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
