import React from "react";
import { TiHome } from "react-icons/ti";
import { CiBookmarkCheck } from "react-icons/ci";
import { IoIosSettings } from "react-icons/io";
import { LuLogOut } from "react-icons/lu";
import { FaRocketchat } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="flex h-screen fixed top-26 left-0 overflow-y-auto shadow-xl font-sans " style={{ width: "17%" }}>
      <div className="bg-[#111827] text-white pt-3 h-full sidebar">
        <nav className="overflow-y-auto px-2 pt-10">
 
<ul className="flex flex-col gap-3">
  <NavLink to="/ItStaffMembers" icon={<TiHome size={26} className="text-gray-400 "/>} text={<span className="text-gray-400 font-normal text-lg">Home</span>} />
  <NavLink to="/ItStaffMembers/notification" icon={<CiBookmarkCheck size={26} className="text-gray-400"/>} text={<span className="text-gray-400 font-normal text-lg">Assigned Issues</span>} />
  <NavLink to="/ItStaffMembers/profile" icon={<IoIosSettings size={26} className="text-gray-400"/>} text={<span className="text-gray-400 font-normal text-lg">Manage profile</span>} />
  <NavLink to="/ItStaffMembers/chatPage" icon={<FaRocketchat size={26} className="text-gray-400"/>} text={<span className="text-gray-400 font-normal text-lg">Internal Messaging</span>} />
 
  <li className="flex p-2 items-center hover:bg-slate-800 hover:text-white cursor-pointer" onClick={handleLogout}>
    <LuLogOut size={26} className="text-gray-400"/>
    <p className="ml-2  font-bold text-gray-400 font-normal text-lg">Logout</p>
  </li>
</ul>
        </nav>
      </div>
    </div>
  );
};

// Custom NavLink component to handle active link styling
const NavLink = ({ to, icon, text }) => {
  const location = useLocation();

  return (
    <Link to={to}>
      <li className={`flex p-2 items-center cursor-pointer ${location.pathname === to ? 'bg-gray-700 text-white' : 'hover:bg-slate-800 hover:text-white'}`}>
        {icon}
        <p className="ml-2 text-xl font-bold">{text}</p>
      </li>
    </Link>
  );
};

export default Sidebar;