import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Sidebar from "../Customer/components/sidebar";
import Header from '../Customer/components/header';
import Dashboard from '../Customer/pages/dashboard';
import Profile from '../Customer/pages/profile';
import Settings from '../Customer/pages/settings';


export default function CustomerDashboard() {
  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      {/* Sidebar */}
      <div className="bg-white w-1/6 min-h-screen">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col w-5/6">
        
        {/* Navigation Bar */}
        <div className="h-14 m-4 shadow-lg">
         <Header/>
        </div>
        
        {/* Page Content */}
        <div className="flex-1 bg-gray-100 p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
         
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
        
      </div>
    </div>
  );
};
