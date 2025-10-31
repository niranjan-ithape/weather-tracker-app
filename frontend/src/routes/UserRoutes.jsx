import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
const UserRoutes = () => {
  return (
    <Routes>
      
      <Route 
        id="2"
        path="/login" 
        element={<Login/>} 
      />

      <Route 
        id="3"
        path="/signup" 
        element={<Signup/>} 
      />
     
      <Route 
        id="5"
        path="*" 
        element={<Navigate to="/" replace />} 
      />
    </Routes>
  );
};

export default UserRoutes;
