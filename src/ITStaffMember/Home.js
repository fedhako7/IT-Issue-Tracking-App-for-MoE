
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import './home.css';

const Home = ({ darkMode }) => {
  const [counts, setCounts] = useState({ assignedCount: 0, solvedCount: 0, RejectedCount: 0 });
  const [assignedIssues, setAssignedIssues] = useState([]);
  const email = JSON.parse(localStorage.getItem("user")).others.email; // Replace with the actual user's email

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`https://it-issue-tracking-api.onrender.com/api/issue/count?email=${email}`);
        setCounts(response.data);
      } catch (error) {
        console.error('Error fetching counts', error);
      }
    };

    fetchCounts();
  }, [email]);

  const data = [
    { id: 0, value: counts.assignedCount, name: 'Assigned Issue' },
    { id: 1, value: counts.solvedCount, name: 'Solved Issue' },
    { id: 2, value: counts.RejectedCount, name: 'Rejected Issue' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className={`flex flex-col p-3 font-sans ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <div className='flex justify-between p-4'>
        <div className={`p-8 shadow-xl rounded-md cardContainer ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className='flex gap-8'>
            <p className='font-semibold text-lg'>Assigned Issue</p>
            <p className=''><AssignmentIndIcon fontSize='large' /></p>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className={`text-center mt-3 py-2 text-lg w-10 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-800 text-white'}`}>{counts.assignedCount}</p>
            <p>+6% this month</p>
          </div>
        </div>
        <div className={`p-8 shadow-xl rounded-md cardContainer ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className='flex gap-8'>
            <p className='font-semibold text-lg'>Solved Issue</p>
            <p className=''><AssignmentTurnedInIcon fontSize='large' /></p>
          </div>
          <div className='flex items-center gap-6 mt-2'>
            <p className={`text-center mt-3 py-2 text-lg w-10 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-800 text-white'}`}>{counts.solvedCount}</p>
            <p>+8% this month</p>
          </div>
        </div>
        <div className={`p-8 shadow-xl rounded-md cardContainer ${darkMode ? 'bg-gray-700' : 'bg-white'}`}>
          <div className='flex gap-8'>
            <p className='font-semibold text-lg'>Rejected Issue</p>
            <p className=''><ThumbDownAltIcon fontSize='large' /></p>
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className={`text-center mt-3 py-2 text-lg w-10 rounded-lg ${darkMode ? 'bg-gray-600 text-white' : 'bg-gray-800 text-white'}`}>{counts.RejectedCount}</p>
            <p>+4% this month</p>
          </div>
        </div>
      </div>
      <div className={`p-4 mt-5 shadow-xl mb-5 cardContainer flex flex-col ${darkMode ? 'bg-gray-700' : 'bg-white'}`} style={{ height: "400px", width: "700px" }}>
        <h3 className={`mb-4 p-2 rounded-md ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-800 text-white'}`}>Pie Chart That Demonstrates IT Staff Members Actions</h3>
        <div className='flex items-center justify-center'>
          <PieChart width={400} height={200} sx={{ mx: 'auto' }}>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div className='flex flex-col'>
            <div className='flex gap-4 p-2 items-center'>
              <div className='bg-[#00C49F] w-10 h-10' />
              <p className='font-semibold text-lg'>Assigned Issue</p>
            </div>
            <div className='flex gap-4 p-2 items-center'>
              <div className='bg-[#0088FE] w-10 h-10' />
              <p className='font-semibold text-lg'>Solved Issue</p>
            </div>
            <div className='flex gap-4 p-2 items-center'>
              <div className='bg-[#FFBB28] w-10 h-10' />
              <p className='font-semibold text-lg'>Rejected Issue</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;