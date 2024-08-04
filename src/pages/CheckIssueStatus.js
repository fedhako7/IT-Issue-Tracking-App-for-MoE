import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const CheckIssueStatus = () => {
  const [issueId, setIssueId] = useState("");
  const [issueDetails, setIssueDetails] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State to store error messages

  const handleCheckStatus = async () => {
    if (!issueId) {
      setErrorMessage("Please fill this input field.");
      setShowDetails(false);
      setIssueDetails(null);
      return;
    }
 const baseUrl = "https://it-issue-tracking-api.onrender.com/api"
    try {
      const res = await axios.get(`${baseUrl}/issue/singleIssue/${issueId}`);
      if (res.data.success) {
        setIssueDetails(res.data.issue);
        setShowDetails(true);
        setErrorMessage(""); // Clear any previous error messages
      } else {
        setIssueDetails(null);
        setShowDetails(false);
        setErrorMessage("You have Entered Invalid details. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching issue details:", error);
      setIssueDetails(null);
      setShowDetails(false);
      setErrorMessage("You have Entered Invalid details. Please try again.");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-400";
      case "InProgress":
        return "text-blue-500";
      case "Completed":
        return "text-green-500";
      default:
        return "text-gray-500";
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex justify-center items-center flex-col pl-20 py-20 font-sans" style={{ marginLeft: "5rem" }}>
      <div className="">
        <h3 className="text-center capitalize text-2xl font-semibold">Check Issue Status</h3>
        <p className="text-gray-800">
          Here you can check issue status. Before checking, you must have created the issue. If you haven't created one yet, click here{" "}
          <Link to="/dashboard/submitIssue">
            <span className="text-blue-700 cursor-pointer">create issue</span>
          </Link>
        </p>
        <div className="">
          <p>You can check the issue status by using Issue Id</p>
          <div className="flex items-center p-3">
            <label>Enter Issue Id</label>
            <input
              style={{ width: "50%" }}
              className="shadow appearance-none border rounded ml-3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
              value={issueId}
              required
              onChange={(e) => setIssueId(e.target.value)}
            />
            <button
              className="mt-2 ml-3 bg-blue-700 hover:bg-blue-800 py-2 px-6 text-white font-semibold rounded cursor-pointer"
              onClick={handleCheckStatus}
            >
              Check Status
            </button>
          </div>
          {errorMessage && (
            <p className="text-red-500 mt-2">{errorMessage}</p>
          )}
        </div>
      </div>

      {/* Display issue details */}
      {showDetails && issueDetails && (
        <div className="bg-gray-100 p-4 rounded-lg my-4">
          <h2 className="text-xl font-semibold mb-2">Issue Details</h2>
          <div className="absolute right-20 bottom-0">
            <button
              onClick={handleReload}
              className="bg-red-500 px-6 py-2 hover:bg-red-700 text-white"
            >
              Close
            </button>
          </div>
          {Object.entries(issueDetails).map(([key, value]) => (
            <div key={key} className="flex mb-2">
              <p className="font-semibold w-32">{key}:</p>
              <p className={getStatusColor(value)}>{value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CheckIssueStatus;