import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const ResetPassword = () => {
  const baseUrl = "http://localhost:3000";
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
    const { id, token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${baseUrl}/reset-password/${id}/${token}`, {
        password,
        confirmPassword,
      });
      console.log(res.data);
      window.location.href = "/login";
    } catch (error) {
      console.log("unable to fetch user data", error);
      window.location.reload();
    }
  };

  return (
    <div className="flex justify-center  shadow-lg h-screen items-center bg-gray-100 ">
      <div className="bg-white shadow-md rounded-md p-8 w-1/3">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex flex-col items-start justify-start p-5">
            <label className=" text-gray-700 text-sm font-bold mb-2 capitalize">
              new password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className=" text-gray-700 text-sm font-bold mb-2 capitalize">
              confirm password
            </label>
            <input
              type="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center flex-col ">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
