import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const baseUrl = "http://localhost:5600/api";
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post(`${baseUrl}/auth/forgot-password`, { email });
  //     console.log("Response from server:", res.data);
  //     alert("Password reset link sent successfully. Check your email.");
  //     // Redirect to login page or display a message to check email
  //     // Example redirect:
  //     // window.location.href = "/login";
  //   } catch (error) {
  //     console.error('Error sending reset link:', error);
  //     if (error.response) {
  //       setErrorMessage(error.response.data.message); // Set error message from backend response
  //     } else {
  //       setErrorMessage("Failed to send reset link. Please try again later.");
  //     }
  //   }
  // };

  return (
    <div className="flex justify-center shadow-lg h-screen items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-md p-8 w-1/3">
        <h2 className="text-2xl font-bold text-center">Forgot Password</h2>
        <form >
          <div className="mb-4 flex flex-col items-start justify-start p-5">
            <label className="text-gray-700 text-sm font-bold mb-2 capitalize">
              Email Address
            </label>
            <input
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
          )}
          <div className="flex items-center flex-col">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Send Reset Link
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
