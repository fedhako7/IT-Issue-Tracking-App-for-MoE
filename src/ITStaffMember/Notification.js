import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
import { PDFDownloadLink } from '@react-pdf/renderer';
import AssignedIssuesPDF from "./AssignedIssuesPDF";
import './notification.css';

const Notification = () => {
  const [assignedIssues, setAssignedIssues] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [currentIssueId, setCurrentIssueId] = useState(null);
  const userEmail = JSON.parse(localStorage.getItem("user")).others.email;

  useEffect(() => {
    getAssignedIssue();
  }, []);

  const baseUrl = "https://it-issue-tracking-api.onrender.com/api";

  const getAssignedIssue = async () => {
    try {
      const res = await axios.get(
        `${baseUrl}/issue/getAssignedIssue?email=${userEmail}`
      );
      setAssignedIssues(res.data.assignedIssue);
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleAccept = async (issueId) => {
    try {
      await axios.put(`${baseUrl}/issue/updateAssignedIssueStatus`, {
        issueId: issueId,
        status: "In progress"
      });
      setAssignedIssues(prev => prev.map(issue => issue._id === issueId ? { ...issue, status: "In progress" } : issue));
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleDone = async (issueId) => {
    const issue = assignedIssues.find(issue => issue._id === issueId);
    if (issue.status !== "In progress") {
      alert("You must accept the issue before marking it as done.");
      return;
    }
    try {
      await axios.put(`${baseUrl}/issue/updateAssignedIssueStatus`, {
        issueId: issueId,
        status: "Solved"
      });
      setAssignedIssues(prev => prev.map(issue => issue._id === issueId ? { ...issue, status: "Solved" } : issue));
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleReject = (issueId) => {
    setCurrentIssueId(issueId);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setRejectionReason("");
  };

  const handleModalSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`${baseUrl}/issue/updateAssignedIssueStatus`, {
        issueId: currentIssueId,
        status: "Rejected",
        reason: rejectionReason,
      });
      setAssignedIssues(prev => prev.map(issue => issue._id === currentIssueId ? { ...issue, status: "Rejected", reason: rejectionReason } : issue));
      handleModalClose();
    } catch (error) {
      console.log("Error", error);
    }
  };

  return (
    <div className="">
      <div className="flex flex-col px-10 font-sans">
        <div className="my-2">
          <PDFDownloadLink document={<AssignedIssuesPDF issues={assignedIssues} />} fileName="AssignedIssuesReport.pdf">
            {({ blob, url, loading, error }) =>
              loading ? "Loading document..." : (
                <button className="bg-sky-700 text-white font-bold px-4 py-2 rounded-md flex items-center gap-3 hover:bg-gray-700">
                  <FaDownload size={25} />
                  Export
                </button>
              )
            }
          </PDFDownloadLink>
        </div>

        <h3 className="text-center text-xl font-semibold">Assigned Issues</h3>
        
        {assignedIssues.length === 0 ? (
          <p className="text-center text-lg mt-4">You have not been assigned any issues yet.</p>
        ) : (
          assignedIssues.map((issue, index) => (
            <div
              key={index}
              className="shadow-lg rounded-lg bg-white my-6 px-4 py-8 container"
              style={{ width: "100%" }}
            >
              <div className="flex gap-5 bg-white cursor-pointer p-2 my-2 rounded-md">
                <p>Issue ID:</p>
                <p>{issue._id}</p>
              </div>
              <div className="flex gap-5 bg-white cursor-pointer p-2 my-2 rounded-md">
                <p>Issue title:</p>
                <p>{issue.title}</p>
              </div>
              <div className="flex gap-5 bg-white cursor-pointer p-2 my-2 rounded-md">
                <p>Category:</p>
                <p>{issue.category}</p>
              </div>
              <div className="flex gap-5 bg-white cursor-pointer p-2 my-2 rounded-md">
                <p>Description:</p>
                <p>{issue.description}</p>
              </div>
              <div className="flex gap-5 bg-white cursor-pointer p-2 my-2 rounded-md">
                <p>Assigned To:</p>
                <p>{issue.assignedTo}</p>
              </div>
              <div className="flex gap-5 bg-white cursor-pointer p-2 my-2 rounded-md">
                <p>Priority To:</p>
                <p>{issue.priority}</p>
              </div>
              <div className="flex gap-5 bg-white cursor-pointer p-2 my-2 rounded-md">
                <p>Department:</p>
                <p>{issue.department}</p>
              </div>
              <div className="flex gap-5 bg-white cursor-pointer p-2 my-2 rounded-md">
                <p>Office Number:</p>
                <p>{issue.roomNumber}</p>
              </div>
              <div className="flex gap-5 bg-white cursor-pointer p-2 my-2 rounded-md">
                <p>Status:</p>
                <p className={issue.status === "Solved" ? "text-green-500" : (issue.status === "In progress" ? "text-yellow-500" : "text-red-500")}>{issue.status}</p>
              </div>
              <div className="flex justify-around mt-4 w-80 gap-5">
                <button
                  onClick={() => handleAccept(issue._id)}
                  className={`py-2 px-6 text-white font-semibold rounded cursor-pointer ${issue.status === "In progress" || issue.status === "Solved" ? "bg-green-300" : "bg-sky-700 hover:bg-green-600"}`}
                  type="button"
                  disabled={issue.status === "In progress" || issue.status === "Solved"}
                >
                  {issue.status === "In progress" ? "In progress" : "Accept"}
                </button>
                <button
                  onClick={() => handleDone(issue._id)}
                  className={`py-2 px-6 text-white font-semibold rounded cursor-pointer ${issue.status === "Solved" ? "bg-green-300" : "bg-sky-700 hover:bg-green-600"}`}
                  type="button"
                  disabled={issue.status === "Solved"}
                >
                  Done
                </button>
                <button
                  onClick={() => handleReject(issue._id)}
                  className={`py-2 px-6 text-white font-semibold rounded cursor-pointer ${issue.status === "Solved" ? "bg-red-300" : "bg-red-500 hover:bg-red-600"}`}
                  type="button"
                  disabled={issue.status === "Solved"}
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Reject Issue</h2>
            <form onSubmit={handleModalSubmit}>
              <label>
                Reason for rejection:
                <textarea
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  required
                />
              </label>
              <div className="modal-buttons">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                <button type="button" onClick={handleModalClose} className="bg-gray-500 text-white py-2 px-4 rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
