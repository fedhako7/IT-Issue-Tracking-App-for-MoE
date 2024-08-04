import React, { Fragment, useState } from "react";
import Navbar from "./components/navbar/Navbar";
import Sidebar from "./components/sidebar/Sidebar";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
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
