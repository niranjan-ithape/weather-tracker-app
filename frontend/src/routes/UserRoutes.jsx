import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Layout from "../components/Layout.jsx";
import Dashboard from "../pages/Dashboard.jsx"; 

const UserRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
            <Home />
        }
      />
      <Route
        id="1"
        path="/home"
        element={
         <Home />
        }
      />
      <Route
        id="2"
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
      />
      <Route
        id="3"
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route 
        id="4"
        path="/login"
        element={<Login />} 
     />
      <Route 
        id="5" 
        path="/signup" 
        element={<Signup />}
     />

     <Route 
        id="6" 
        path="/dashboard" 
        element={<Dashboard/>}
     />
      <Route 
      path="*"
      element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default UserRoutes;
