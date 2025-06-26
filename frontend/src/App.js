import React from "react";
import { Route, Routes } from "react-router-dom";

import ProtectedRoute from './components/protectedRoute';

import Nav from "./components/navigation";

import Admin from "./routes/adminDashboard";

import Customer from "./routes/customerDashboard";

import CustomerSupporter from "./routes/supportDashboard";
import Login from "./pages/signin";
import Signup from "./pages/signup";
import Logout from "./components/logout";
import Home from "./pages/home";
import VerifyEmail from "./components/verifyemail";
import ForgotPassword from "./pages/forgotPassword";
import ResetPassword from "./components/resetPassword";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/signin" element={<Login />} />

        <Route path="/forgotpassword" element={<ForgotPassword/>} />

        <Route path="/logout" element={<Logout />} />

        
        <Route path="/verify/:token" element={<VerifyEmail />} />

        <Route path="/reset/:token" element={<ResetPassword />} />


        <Route 
          path="/admin-dashboard/*" 
          element={<ProtectedRoute allowedRoles={['admin']}><Admin /></ProtectedRoute>} 
        />
        <Route 
          path="/customer-dashboard/*" 
          element={<ProtectedRoute allowedRoles={['customer']}><Customer /></ProtectedRoute>} 
        />
       
        <Route 
          path="/support-dashboard/*" 
          element={<ProtectedRoute allowedRoles={['customer_supporter']}><CustomerSupporter /></ProtectedRoute>} 
        />
    
      </Routes>
      
    </div>
  )
}

export default App;


