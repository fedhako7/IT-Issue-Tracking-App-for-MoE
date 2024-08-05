import React, { Fragment } from "react";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import Body from "./components/body/Body";

const Dashboard = () => {
  return (
    <Fragment>
          <Navbar />
          <div className="flex space-x-20 pl-40 mt-20 ">
            <Sidebar />
            <Body />
          </div>
    </Fragment>
  );
};

export default Dashboard;
