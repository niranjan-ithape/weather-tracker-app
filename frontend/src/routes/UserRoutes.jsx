import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Signup from "../pages/Signup.jsx";
import Home from "../pages/Home.jsx";
import About from "../pages/About.jsx";
import Contact from "../pages/Contact.jsx";
import Layout from "../components/Layout.jsx";
import Dashboard from "../pages/Dashboard.jsx"; 
import AddCity from "../pages/AddCity.jsx";
import AllCities from "../pages/AllCities.jsx";
import CityDetails from "../components/CityDetails.jsx";


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
        element={
        <Layout>
        <Dashboard/>
        </Layout>}
     />

       <Route 
        id="7" 
        path="/add-city" 
        element={
        <Layout>
        <AddCity/>    
        </Layout>}
     />

       <Route 
        id="8" 
        path="/all-cities" 
        element={<Layout>
        <AllCities/>    
        </Layout>}
     />

      <Route 
       id="9"
       path="/city/:cityName" 
       element={<CityDetails />} 
     />

       
      <Route 
      path="*"
      element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default UserRoutes;
