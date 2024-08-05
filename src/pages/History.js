import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { FaDownload } from "react-icons/fa";
const History = () => {
   const baseUrl = "https://it-issue-tracking-api.onrender.com/api"
  const [historyData, setHistoryData] = useState([]);

  useEffect(() => {
    fetchUserIssue();
  }, []);

  const fetchUserIssue = async () => {
    try {
      const userId = JSON.parse(localStorage.getItem("user")).others._id;
      const res = await axios.get(`${baseUrl}/issue/historyIssue/${userId}`);
      if (Array.isArray(res.data.issues) && res.data.issues.length > 0) {
        setHistoryData(res.data.issues);
        console.log(historyData);
      } else return console.log("It is not array");
      console.log(res.data);
    } catch (error) {
      console.log("Unable to get user Id");
    }
  };
  return (
    <div className="flex flex-col px-8 font-sans">
      <div className="">
        <div className="my-2">
        <button className="bg-black text-white font-bold px-4 py-2 rounded-md flex items-center gap-3 hover:bg-gray-700"> 
        <FaDownload size={25}/>
        Download
        </button>   
        </div>
        <h3 className="text-center font-semibold text-xl">Latest submitted Issue</h3>
        <div>
          {historyData.map((item, index) => (
            <div key={index} className="bg-white p-4 rounded-lg my-4 border-white shadow-md">
              <>
                <div>
                  <span className="font-semibold text-lg">Issue Title</span>
                  <p className="  ">{item.title}</p>
                </div>
                <div>
                  <span className="font-semibold text-lg">Description</span>
                  <p className="text-gray-700">{item.description}</p>
                </div>
                <div>
                  <span className="font-semibold text-lg">Issue Id</span>
                  <p className="text-gray-700">{item._id}</p>
                </div>
                <div>
                  <span className="font-semibold text-lg">User Id</span>
                  <p className="text-gray-700">{item.userId}</p>
                </div>
                <div>
                  <span className="font-semibold text-lg">Status</span>
                  <p className="text-green-700">{item.status}</p>
                </div>
                <div>
                  <span className="font-semibold text-lg">Submission Date</span>
                  <p className="text-gray-700">{item.date}</p>
                </div>
                <div>
                  <span className="font-semibold text-lg">Issue Category</span>
                  <p className="text-gray-700">{item.category}</p>
                </div>
                <div>
                  <span className="font-semibold text-lg">Submitting Department</span>
                  <p className="text-gray-700">{item.department}</p>
                </div>
              </>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
