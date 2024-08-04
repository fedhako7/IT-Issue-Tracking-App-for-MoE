import React from "react";
import Home from "../../ITStaffMember/Home";
import Profile from "../../ITStaffMember/Profile";
import Notification from "../../ITStaffMember/Notification";
import Chat from "../../ITStaffMember/Chat";
import { Router, Link, Route, Routes } from "react-router-dom";

const ITStaff = () => {
  return (
    <div className="flex flex-col rounded-md shadow-xl  mt-6" style={{width:"85%"}}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/chatPage" element={<Chat />} />
      </Routes>

    </div>
  );
};

export default ITStaff;
