import React, { Fragment } from "react";
import Navbar from "./components/navbar/Navbar";
import Staff from "./components/staffSidebar/Staff";
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
