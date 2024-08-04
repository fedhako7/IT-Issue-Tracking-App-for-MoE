import React, { useState, useEffect } from 'react';
import DeskImg from '../assets/help-desk-automation.webp';
import problem from '../assets/problem.png';
import barChart from '../assets/bar-chart.png';
import Plus from '../assets/plus.png';
import caution from '../assets/caution.png';
import axios from 'axios';

const Body = () => {
  const [faqs, setFaqs] = useState([]);
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await axios.get("https://it-issue-tracking-api.onrender.com/api/FAQ/getFaq", {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: false,
        });
        setFaqs(res.data);
      } catch (error) {
        console.error("Unable to Fetch FAQ", error);
      }
    };
    
    fetchFAQs();
  }, []);

  const handleToggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <div>
      <div className="flex" id="features">
        <div>
          <h1 className="font-extrabold text-sky-700 text-4xl p-5 pt-[40px] font-sans">
            Powerful help desk software for the entire enterprise
          </h1>
          <p className="text-xl px-5 font-sans">
            Our feature-rich help desk software speeds up ticket resolution with the help of proactive automations and highly customizable workflows.
          </p>
        </div>
        <img className="max-h-[500px] w-[700px]" src={DeskImg} alt="Desk" />
      </div>
      <section>
        <h1 className="text-center p-5 tracking-wider text-3xl font-extrabold text-sky-900 font-sans">
          Essential features available in this help desk software
        </h1>
        <div className="flex">
          <div className="border-2 m-5 shadow-2xl">
            <img className="max-w-[100px] mx-auto p-5" src={caution} alt="Caution" />
            <p className="text-center text-2xl text-sky-700 font-sans">Incident management</p>
            <hr className="my-2 mx-3" />
            <p className="text-center text-lg px-5 pt-2 pb-10 leading-10 font-sans">
              Detection and logging of Issues <br /> Incident categorization and prioritization <br /> User Communication,keeping user informed about the incident status.
            </p>
          </div>
          <div className="border-2 m-5 shadow-2xl">
            <img className="max-w-[100px] mx-auto p-5" src={problem} alt="Problem" />
            <p className="text-center text-2xl text-sky-700 font-sans">Problem management</p>
            <hr className="my-2 mx-3" />
            <p className="text-center text-lg px-5 pt-2 pb-10 leading-10 font-sans">
              Reduce service disruptions <br /> Resolving Employee Issues accuretly and timely<br /> and manage the entire life cycle of a ticket.
            </p>
          </div>
          <div className="border-2 m-5 shadow-2xl">
            <img className="max-w-[100px] mx-auto p-5" src={barChart} alt="Bar Chart" />
            <p className="text-center text-2xl text-sky-700 font-sans">Advanced Analytics</p>
            <hr className="my-2 mx-3" />
            <p className="text-center text-lg px-5 pt-2 pb-10 leading-10 font-sans">
              Analytics of Issue <br /> That are <br /> Solved,Rejected,InProgress
            </p>
          </div>
        </div>
      </section>
      <div id="faq">
        <h1 className="text-center font-extrabold text-6xl p-10 pb-8 text-sky-700 font-sans">FAQ</h1>
        <p className="text-center text-2xl font-sans">Popular questions.</p>
        <div className="mb-10">
          {faqs.map((faq, index) => (
            <div key={index} className="flex space-x-10 mx-10 mt-10">
              <div 
                className="flex space-x-3 cursor-pointer border-2 border-sky-700 text-sky-700 px-[60px] py-3 rounded-lg font-extrabold text-2xl font-sans"
                onClick={() => handleToggleFAQ(index)}
              >
                <img className="max-w-[30px] h-[30px]" src={Plus} alt="Plus" />
                <p>{faq.question}</p>
              </div>
              {expandedFAQ === index && (
                <div className="text-xl px-10 py-5 font-sans bg-gray-100 rounded-lg shadow-lg">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
