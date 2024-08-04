import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../redux/userSlice";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";

const Login = () => {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const baseUrl = "https://it-issue-tracking-api.onrender.com/api";

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

    if (e.target.name === "email") {
      setValidationErrors({
        ...validationErrors,
        email: validateEmail(e.target.value) ? "" : "Invalid email format",
      });
    } else if (e.target.name === "password") {
      setValidationErrors({
        ...validationErrors,
        password:
          e.target.value.length >= 6 ? "" : "Password must be at least 6 characters",
      });
    }
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      dispatch(loginStart());

      try {
        const res = await axios.post(`${baseUrl}/users/login`, loginData, {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        });
        const department = res.data.others.department;
        console.log(department);

        const isITStaff = department.includes("IT Staff");
        if (isITStaff) {
          setTimeout(() => {
            window.location.href = "/ItStaffMembers";
          }, 0);
        } else {
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 0);
        }

        dispatch(loginSuccess(res.data));
        console.log("Logged In user");
      } catch (error) {
        dispatch(loginFailure());
        if (error.response && error.response.status === 404) {
          setErrorMessage("A user is not found");
        } else {
          setErrorMessage("Incorrect Email or password");
        }
        setTimeout(() => {
          setErrorMessage("");
        }, 5000);
      }
    } else {
      setErrorMessage("An error occurred, All input fields are required");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
    }
  };

  const validateForm = () => {
    const emailValid = validateEmail(loginData.email);
    const passwordValid = loginData.password.length >= 6;

    setValidationErrors({
      email: emailValid ? "" : "Invalid email format",
      password: passwordValid ? "" : "Password must be at least 6 characters",
    });

    return emailValid && passwordValid;
  };

  const googleAuth = () => {
    window.open("http://it-issue-tracking-api.onrender.com/auth/google");
  };

  const facebookAuth = () => {
    window.open("http://it-issue-tracking-api.onrender.com/auth/facebook");
  };

  return (
    <div className="flex justify-center shadow-lg h-screen items-center bg-gray-100 font-sans">
      <div className="bg-white shadow-md rounded-md p-8">
        <h2 className="text-2xl font-bold text-center">Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-2 flex flex-col items-start justify-start p-5">
            <label className="text-gray-700 text-sm mb-2 capitalize">
              Email Address
            </label>
            <input
              type="text"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                validationErrors.email ? "border-red-500" : ""
              }`}
              name="email"
              onChange={handleChange}
              value={loginData.email}
            />
            {validationErrors.email && (
              <p className="text-red-500 text-xs italic">{validationErrors.email}</p>
            )}
            <label className="text-gray-700 text-sm mb-2 capitalize">
              Password
            </label>
            <input
              type="password"
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                validationErrors.password ? "border-red-500" : ""
              }`}
              name="password"
              onChange={handleChange}
              value={loginData.password}
            />
            {validationErrors.password && (
              <p className="text-red-500 text-xs italic">{validationErrors.password}</p>
            )}
          </div>
          <div className="flex space-x-8 mb-2">
            <div className="flex gap-2">
              <input type="checkbox" className="cursor-pointer" />
              <label>Remember me</label>
            </div>
            <Link to="/forgot-password">
              <p className="cursor-pointer text-lg text-gray-600">
                Forgot Password
              </p>
            </Link>
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
          )}
          <div className="flex items-center flex-col">
            <button className="bg-sky-700 hover:bg-sky-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Sign In
            </button>
          </div>
          <div className="mt-2">
            <p>
              Don't have an account?{" "}
              <Link to="/register">
                <span className="text-lg text-slate-500 cursor-pointer">
                  Create Account
                </span>
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
