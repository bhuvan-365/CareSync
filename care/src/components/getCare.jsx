<<<<<<< HEAD
import React, { useState } from 'react';
import Notify from './Notify';
import AIChat from './AIChat';
import Report from './Report';
import Overview from './Overview'; // ⬅️ new page

const GetCare = () => {
  const [selected, setSelected] = useState('overview'); // "overview", "notify", "ai", "report"

  const cardStyle = (imgUrl) => ({
    backgroundImage: `url("${imgUrl}")`,
    boxShadow:
      'rgba(0, 0, 0, 0.4) 0px 2px 4px, ' +
      'rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, ' +
      'rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
  });

  const renderContent = () => {
    switch (selected) {
      case 'overview':
        return <Overview />;
      case 'notify':
        return <Notify />;
      case 'ai':
        return <AIChat />;
      case 'report':
        return <Report />;
      default:
        return null; // ⬅️ No default message
    }
  };

  return (
    <div className="parent">
      {/* Upper Section: Cards */}
      <div
        className="upper w-full h-[35vh] flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/image/getcareBanner.jpg")' }}
      >
        <div className="cards flex justify-around items-center gap-12 md:gap-24">
          {/* New Box: Overview */}
          <div
            onClick={() => setSelected('overview')}
            className="h-[205px] w-[190px] rounded-2xl p-5 bg-cover bg-center flex items-end relative overflow-hidden cursor-pointer"
            style={cardStyle('/image/yourdata.jpg')}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <div className="relative z-10 font-semibold text-2xl text-white">
              Your Data
            </div>
          </div>

          <div
            onClick={() => setSelected('notify')}
            className="h-[205px] w-[190px] rounded-2xl p-5 bg-cover bg-center flex items-end relative overflow-hidden cursor-pointer"
            style={cardStyle('/image/notification.jpg')}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <div className="relative z-10 font-semibold text-2xl text-white">
              Get Notify
            </div>
          </div>

          <div
            onClick={() => setSelected('ai')}
            className="h-[205px] w-[190px] rounded-2xl p-5 bg-cover bg-center flex items-end relative overflow-hidden cursor-pointer"
            style={cardStyle('/image/ai.jpg')}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <div className="relative z-10 font-semibold text-2xl text-white">
              Chat with Our AI
            </div>
          </div>

          <div
            onClick={() => setSelected('report')}
            className="h-[205px] w-[190px] rounded-2xl p-5 bg-cover bg-center flex items-end relative overflow-hidden cursor-pointer"
            style={cardStyle('/image/report.jpg')}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <div className="relative z-10 font-semibold text-2xl text-white">
              Health Report
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: Only visible if something is selected */}
      {selected && (
        <div className="lower w-full min-h-[80vh] bg-gray-100 border-t-2 border-gray-300">
          {renderContent()}
        </div>
      )}
=======
import React from 'react';

const GetCare = () => {
  return (
    <div>
      <h2>Get Care Page</h2>
>>>>>>> 2b78b4bd69c8f35aaec02d63305c2ac10c60a083
    </div>
  );
};

<<<<<<< HEAD
export default GetCare;
=======
export default GetCare;
>>>>>>> 2b78b4bd69c8f35aaec02d63305c2ac10c60a083
