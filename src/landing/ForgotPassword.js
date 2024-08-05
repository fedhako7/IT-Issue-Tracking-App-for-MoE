import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage] = useState('');

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
