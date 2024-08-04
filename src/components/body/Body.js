import React from "react";
import Home from "../../pages/Home";
import SubmitIssue from "../../pages/SubmitIssue";
import CheckIssueStatus from "../../pages/CheckIssueStatus";
import Profile from "../../pages/Profile";
import SendFeedback from "../../pages/SendFeedback";
import Notification from "../../pages/Notification";
import History from "../../pages/History";
import Chat from "../../pages/Chat";
import { Router, Link, Route, Routes } from "react-router-dom";

const Body = () => {
  return (
    <div className="flex flex-col rounded-md shadow-xl bg-white mt-6" style={{width:"85%"}} >
      <Routes>
        <Route
          path="/"
          element={
           
              <Home />
           
          }
        />
        <Route
          path="/submitIssue"
          element={
           
              <SubmitIssue />
            
          }
        />
        <Route path="/checkIssueStatus" element={<CheckIssueStatus />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/feedback" element={<SendFeedback />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/chatPage" element={<Chat />} />
        <Route path="/history" element={<History />} />
      </Routes>

      {/* <SubmitIssue />
        <CheckIssueStatus />
        <Profile />
        <SendFeedback />
        <Notification />
        <Chat /> */}
    </div>
  );
};

export default Body;
