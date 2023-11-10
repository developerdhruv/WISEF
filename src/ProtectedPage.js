import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import './App.js'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.js'
import './App.css'



import Community from "./Community.js";
import ProductCard from "./Pages/ProductCard";
import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";












const ProtectedPage = () => {
    const navigate = useNavigate();
    return(
        <>

        
        

        <div className="herose">
            <div className="rj">
                <nav className="navbar">
                
                    <img className="logo" src="logo.PNG" alt="" />
                    <a href="/Community" className="navbar-item">Contribute</a>
                    <a href="#" className="navbar-item">About Founder</a>
                    <a href="#" className="navbar-item">Volunteer</a>
                    
                    <button onClick={()=> navigate("/community")} className="navbar-item login-btn">Raise Request</button>

                    <UserButton/>
                </nav>

                <map className='mapsrj'>
                    <iframe className="maps"
                        id="gmap_canvas"
                        src="https://maps.google.com/maps?width=1510&height=533&hl=en&q=%20Delhi+()&t=&z=12&ie=UTF8&iwloc=B&output=embed"
                    />
                </map>

                <button  className="SOS" onClick={()=> navigate("/community")} >ASK HELP NOW</button>
            </div>


            


            



            
        </div>

        



        </>
        

        

       
    )
    
}


export default ProtectedPage;
