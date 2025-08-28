import axios from "axios";
import React, { use } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
});
const UseAxiosSecure = () => {
  const { user, logOut } = use(AuthContext);
  axiosInstance.interceptors.request.use((config) => {
    config.headers.authorization = `Bearer ${user?.accessToken}`;
    return config;
  });
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.status === 401) {
        logOut()
          .then(() => {
            // alert("You are logged out!");
          })
          .catch((error) => {
            // alert(error);
          });
        Swal.fire({
          icon: "error",
          title: "401",
          text: "Unauthorized Access!",
        });
      }
      if (error.status === 403) {
        Swal.fire({
          icon: "error",
          title: "403",
          text: "Forbidden Access!",
        });
      }
    }
  );
  return axiosInstance;
};

export default UseAxiosSecure;
