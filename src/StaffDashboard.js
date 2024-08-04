import React, { Fragment, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Staff from "./components/staffSidebar/Staff";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ITStaff from "./components/ITStaff/ITStaff";

const StaffDashboard = () => {
  return (
    <Fragment>
      <Navbar />
      <div className="flex space-x-20 pl-40 mt-20">
        <Staff />
        <ITStaff />
      </div>
    </Fragment>
  );
};

export default StaffDashboard;
