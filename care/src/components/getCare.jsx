import React, { useState } from 'react';
import NotifyP from '../pages/NotifyPage';
import AIChat from './AIChat';
import Report from './Report';
import Overview from './Overview';
import './getCare.css'

const GetCare = () => {
  const [selected, setSelected] = useState('overview');

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
        return <NotifyP />;
      case 'ai':
        return <AIChat />;
      case 'report':
        return <Report />;
      default:
        return null;
    }
  };

  return (
    <div className="get-care-container" style={{ marginTop: '80px' }}> {/* Added margin-top */}
      {/* Upper Section: Cards */}
      <div
        className="upper w-full h-[35vh] min-h-[250px] flex justify-center items-center bg-cover bg-center"
        style={{ backgroundImage: 'url("/image/getcareBanner.jpg")' }}
      >
        <div className="cards-container flex flex-wrap justify-center items-center gap-4 md:gap-8 lg:gap-12 xl:gap-24 p-4">
          {/* Overview Card */}
          <div
            onClick={() => setSelected('overview')}
            className="card h-[180px] md:h-[205px] w-[160px] md:w-[190px] rounded-2xl p-4 md:p-5 bg-cover bg-center flex items-end relative overflow-hidden cursor-pointer"
            style={cardStyle('/image/yourdata.jpg')}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <div className="padding relative z-10 font-semibold text-xl md:text-2xl text-white">
              Your Data
            </div>
          </div>

          {/* Notify Card */}
          <div
            onClick={() => setSelected('notify')}
            className="card h-[180px] md:h-[205px] w-[160px] md:w-[190px] rounded-2xl p-4 md:p-5 bg-cover bg-center flex items-end relative overflow-hidden cursor-pointer"
            style={cardStyle('/image/notification.jpg')}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <div className="padding relative z-10 font-semibold text-xl md:text-2xl text-white">
              Get Notify
            </div>
          </div>

          {/* AI Chat Card */}
          <div
            onClick={() => setSelected('ai')}
            className="card h-[180px] md:h-[205px] w-[160px] md:w-[190px] rounded-2xl p-4 md:p-5 bg-cover bg-center flex items-end relative overflow-hidden cursor-pointer"
            style={cardStyle('/image/ai.jpg')}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <div className="padding relative z-10 font-semibold text-xl md:text-2xl text-white">
              Chat with Our AI
            </div>
          </div>

          {/* Report Card */}
          <div
            onClick={() => setSelected('report')}
            className="card h-[180px] md:h-[205px] w-[160px] md:w-[190px] rounded-2xl p-4 md:p-5 bg-cover bg-center flex items-end relative overflow-hidden cursor-pointer"
            style={cardStyle('/image/report.jpg')}
          >
            <div className="absolute inset-0 bg-black/20 rounded-2xl" />
            <div className="padding relative z-10 font-semibold text-xl md:text-2xl text-white">
              Health Report
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section */}
      {selected && (
        <div className="lower w-full min-h-[80vh] bg-gray-100 border-t-2 border-gray-300">
          {renderContent()}
        </div>
      )}
    </div>
  );
};

export default GetCare;
