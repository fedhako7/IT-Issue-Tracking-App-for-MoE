import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import axios from 'axios';
import './home.css';  
import { Link } from 'react-router-dom';
const Home = () => {
  const emptyIssue=()=>{
  return(
    <div className='flex gap-2 items-center'>
      <p className='p-2 text-lg'>You have not submitted any issue so far</p>
      <Link to="/dashboard/submitIssue">
      <p className='text-gray-600 '>
       submit your first issue

      </p>
      </Link>
    </div>
  )
  }
  const [counts, setCounts] = useState({
    submittedCount: 0,
    inProgressCount: 0,
    solvedCount: 0,
  });
  const [latestIssue, setLatestIssue] = useState(null);
  const [error, setError] = useState('');

  const userId = JSON.parse(localStorage.getItem("user")).others._id;

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(`https://it-issue-tracking-api.onrender.com/api/issue/counts/${userId}`);
        setCounts(response.data);
      } catch (error) {
        console.error('Failed to fetch issue counts:', error);
      }
    };

    const fetchLatestIssue = async () => {
      try {
        const response = await axios.get(`https://it-issue-tracking-api.onrender.com/api/issue/latest/${userId}`);
        if (response.data) {
          setLatestIssue(response.data);
        } else {
          setError(emptyIssue() );
        }
      } catch (error) {
        console.error('Failed to fetch the latest issue:', error);
        setError('Failed to fetch the latest issue');
      }
    };

    fetchCounts();
    fetchLatestIssue();
  }, [userId]);

  const data = [
    { id: 0, value: counts.submittedCount, name: 'Submitted Issues' },
    { id: 1, value: counts.inProgressCount, name: 'In Progress' },
    { id: 2, value: counts.solvedCount, name: 'Solved Issues' },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div className='flex flex-col p-3 font-sans'>
      <div className='flex justify-between p-4'>
        <div className='p-8 shadow-xl bg-white rounded-md cardContainer'>
          <div className='flex gap-8'>
            <p className='font-semibold text-black text-lg'>Submitted Issue</p>
            <AssignmentIndIcon fontSize='large' />
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-center mt-3 py-2 text-lg bg-gray-800 w-10 text-white rounded-lg'>{counts.submittedCount}</p>
            <p>+10% this month</p>
          </div>
        </div>
        <div className='p-8 shadow-xl bg-white rounded-md cardContainer'>
          <div className='flex gap-8'>
            <p className='font-semibold text-black text-lg'>In Progress</p>
            <PublishedWithChangesIcon fontSize='large' />
          </div>
          <div className='flex items-center gap-6 mt-2'>
            <p className='text-center mt-3 py-2 text-lg bg-gray-800 w-10 text-white rounded-lg'>{counts.inProgressCount}</p>
            <p>+3% this month</p>
          </div>
        </div>
        <div className='p-8 shadow-xl bg-white rounded-md cardContainer'>
          <div className='flex gap-8'>
            <p className='font-semibold text-black text-lg'>Solved</p>
            <DoneAllIcon fontSize='large' />
          </div>
          <div className='flex items-center justify-between mt-2'>
            <p className='text-center mt-3 py-2 text-lg bg-gray-800 w-10 text-white rounded-lg'>{counts.solvedCount}</p>
            <p>+6% this month</p>
          </div>
        </div>
      </div>
      
      <div className='p-4 mt-5 shadow-xl mb-5 cardContainer bg-white flex flex-col' style={{ height: '400px', width: '700px' }}>
        <h3 className='mb-4 bg-gray-800 text-white p-2 rounded-md'>Current Submitted Issue</h3>
        {latestIssue ? (
          <div>
            <p><strong>Title:</strong> {latestIssue.title}</p>
            <p><strong>Description:</strong> {latestIssue.description}</p>
            <p><strong>Status:</strong> {latestIssue.status}</p>
          </div>
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
};

export default Home;