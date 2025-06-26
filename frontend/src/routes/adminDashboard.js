import React from 'react';
import Sidebar from "../Admin/components/sidebar";
import {Route, Routes } from 'react-router-dom';
import Dashboard from '../Admin/pages/dashboard';

import Users from '../Admin/pages/users/users';




import Settings from '../Admin/pages/settings';

import Account from '../Admin/pages/account';



export default function AdminDashboard() {
  return (
      <div className="flex bg-gray-100  min-h-screen">

        <div className='bg-white'>
          <Sidebar />
        </div>


        <div className="flex-1 flex flex-col">


          <div className="flex-1 p-4 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users/*" element={<Users />} />

             
              <Route path="/settings" element={<Settings />} />
              <Route path="/account" element={<Account />} />
              

            </Routes>
          </div>
        </div>
      </div>
  );
}
