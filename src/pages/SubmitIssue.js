import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { FaTimes } from "react-icons/fa"; // Import close icon from react-icons library
import { Link } from "react-router-dom";

const SubmitIssue = () => {
  const baseUrl = "https://it-issue-tracking-api.onrender.com/api";
  const [selectedDate, setSelectedDate] = useState(null);
  const [issueDetail, setIssueDetail] = useState({
    title: "",
    category: "",
    department: "",
    description: "",
    roomNumber: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // State to store the success message
  const [errors, setErrors] = useState({
    title: "",
    category: "",
    department: "",
    roomNumber: "",
    description: "",
  }); // State to store validation errors
  const [issueId, setIssueId] = useState(""); // State to store the issue ID

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIssueDetail((prevIssueDetail) => ({
      ...prevIssueDetail,
      date: date,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";

    // Perform specific validation based on the input field
    switch (name) {
      case "title":
      case "category":
      case "department":
        if (!isNaN(value)) {
          errorMessage = "Value must be a string";
        } else if (value.length < 3) {
          errorMessage = "Value must be at least 3 characters long";
        }
        break;
      case "roomNumber":
        if (isNaN(value)) {
          errorMessage = "Value must be a number";
        }
        break;
      case "description":
        if (value.length < 3) {
          errorMessage = "Value must be at least 3 characters long";
        }
        break;
      default:
        break;
    }

    // Set the error message for the input field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));

    // Update the issueDetail state
    setIssueDetail({ ...issueDetail, [name]: value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const { title, category, department, description, roomNumber } = issueDetail;
      if (!title || !category || !department || !description || !roomNumber ) {
        throw new Error("Please fill in all required fields.");
      }

      const userId = JSON.parse(localStorage.getItem("user")).others._id;
      const issueData = {
        ...issueDetail,
        userId: userId,
      };

      const response = await axios.post(`${baseUrl}/issue/newIssue`, issueData);
      console.log(response.data.issueId); // Log the response to check its structure
      const newIssueId = response.data.issueId || response.data.id || response.data._id; // Extract issue ID based on actual response structure

      // Set issueId state
      setIssueId(newIssueId);

      // Construct success message with Issue ID and link
      setSuccessMessage(`Issue submitted successfully. copy issue Id below! Issue ID: ${newIssueId}.  `);

      // Clear form inputs
      setIssueDetail({
        title: "",
        category: "",
        department: "",
        description: "",
        roomNumber: "",
      });
      setSelectedDate(null);
    } catch (error) {
      console.error("Unable to submit issue:", error.message);
      alert("Unable to submit issue. Please try again later.");
    }
  };

  const handleCloseSuccessMessage = () => {
    setSuccessMessage(""); // Clear the success message when the close icon is clicked
  };

  return (
    <div className="flex justify-center p-20 items-center my-4 font-sans" style={{ width: "70%" }}>
      <form onSubmit={handleSave}>
        <div className="flex flex-col">
          <h3 className="text-center text-2xl capitalize font-semibold">Create new Issue</h3>
          <div>
            <label>Title</label>
            <input
              type="text"
              placeholder="Enter title"
              onChange={handleChange}
              name="title"
              value={issueDetail.title}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            />
            {errors.title && <p className="text-red-500">{errors.title}</p>}
            <label>Category</label>
            <input
              type="text"
              placeholder="Enter category"
              onChange={handleChange}
              name="category"
              value={issueDetail.category}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            />
            {errors.category && <p className="text-red-500">{errors.category}</p>}
            <label>Department</label>
            <input
              type="text"
              placeholder="Enter department"
              onChange={handleChange}
              name="department"
              value={issueDetail.department}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            />
            {errors.department && <p className="text-red-500">{errors.department}</p>}
            <label>Room Number</label>
            <input
              type="text"
              placeholder="Enter room number"
              onChange={handleChange}
              name="roomNumber"
              value={issueDetail.roomNumber}
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mt-2"
            />
            {errors.roomNumber && <p className="text-red-500">{errors.roomNumber}</p>}
            <div className="flex flex-col">
              <label className="my-3 font-semibold">Description</label>
              <textarea
                placeholder="Write detail about issue you have faced..."
                onChange={handleChange}
                name="description"
                value={issueDetail.description}
                required
                minLength="3"
                className="px-5 shadow appearance-none border rounded w-full py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              ></textarea>
            </div>
            {errors.description && <p className="text-red-500">{errors.description}</p>}
            <div className="flex justify-around mt-2">
              <button
                className="bg-sky-700 hover:bg-blue-800 py-2 px-6 text-white font-semibold rounded cursor-pointer"
                type="submit"
              >
                Save
              </button>
              <p className="bg-red-700 hover:bg-red-800 py-2 px-6 text-white font-semibold rounded cursor-pointer">
                Cancel
              </p>
            </div>
          </div>
        </div>
      </form>
      {successMessage && (
        <div className="mt-4 mx-3 p-4 border rounded bg-green-100 relative">
          <FaTimes className="absolute top-0 right-0 m-3 cursor-pointer" onClick={handleCloseSuccessMessage} /> {/* Close icon */}
          <p className="text-green-700 font-semibold">{successMessage} <Link to={`/dashboard/checkIssueStatus`} className="text-gray-500">click here to check status</Link></p>
        </div>
      )}
    </div>
  );
};

export default SubmitIssue;
