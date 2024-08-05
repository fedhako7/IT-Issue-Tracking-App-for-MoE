import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { CiChat1 } from "react-icons/ci";
import {logout} from '../../redux/userSlice'
import { io } from "socket.io-client";
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import MOE from "../../assets/MOE.png";
import "./Navbar.css";  

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const socket = useRef();
  const location = useLocation();
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser).others : null;
  const firstName = user ? user.firstName : "";
  const lastName = user ? user.lastName : "";
  const department = user ? user.department : "";
  const fullName = `${firstName} ${lastName}`;

  let notificationLink = "/dashboard/chatPage";
  let profileLink = "/dashboard/profile";

  if (department.includes("IT Staff")) {
    notificationLink = "/ItStaffMembers/chatPage";
    profileLink = "/ItStaffMembers/profile";
  }

  useEffect(() => {
    // Establish socket connection
    socket.current = io("ws://localhost:5800");

    // Listen for new messages
    socket.current.on("getMessage", (data) => {
      setNotificationCount((prev) => prev + 1);
    });

    return () => {
      // Cleanup socket connection on component unmount
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (location.pathname === notificationLink) {
      setNotificationCount(0); // Reset notification count when on chat page
    }
  }, [location.pathname]);


  const handleLogout=()=>{
    dispatch(logout())
    navigate("/login")
    
  }

  return (
    <div className="bg-gray-100 p-4 fixed top-0 left-0 z-10 mt-0 w-full shadow-xl font-sans">
      <div className="flex justify-between items-center">
        <div className="flex gap-5 px-3 items-center">
        <img className="max-w-[60px]" src={MOE} alt=""/>
          <p className="text-black text-xl font-bold welcome-message">{fullName}</p>
        </div>
        <div className="flex items-center space-x-6">
          {/* Hamburger menu icon */}
          <div className="lg:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {showMenu ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />  
                )}
              </svg>
            </button>
          </div>
          {/* Menu items */}
          <div className="flex items-center justify-end gap-5">
            <div className="cursor-pointer relative">
              <Link to={notificationLink} onClick={() => setNotificationCount(0)}>
                <CiChat1 className="text-white" color="black" size={28} />
                {notificationCount > 0 && (
                  <span className="absolute top-3 bg-red-800 rounded-full w-5 text-center text-white text-sm">
                    {notificationCount}
                  </span>
                )}
              </Link>
            </div>
            <button className="cursor-pointer bg-sky-700 text-white px-3 py-2 rounded-lg font-bold" onClick={handleLogout}>
             Logout
            </button>
            <div>
              <Link to={profileLink}>
                <img
                  src={"https://i.pinimg.com/564x/d2/98/4e/d2984ec4b65a8568eab3dc2b640fc58e.jpg"}
                  className="rounded-full object-cover w-10 h-10"
                  alt="Profile"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};  

export default Navbar;
