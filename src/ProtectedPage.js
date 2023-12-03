import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Form } from "react-bootstrap";
import { useState } from "react";
import './App.js'
import React from "react";
import ReactDOM from "react-dom/client";
import './index.js'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Row, Col,  } from 'react-bootstrap';

import ProductCard from './Pages/ProductCard';
import { supabase } from './supabaseClient';


import Community from "./Community.js";

import { BrowserRouter, Route, Routes, redirect } from "react-router-dom";
import { useEffect } from "react";
import axios from 'axios';


function ProtectedPage() {
    const [ name, setName ] = useState("");
    const [ location, setLocation ] = useState("");
    const [ requests , setRequest] = useState([]);
  
    console.log(name);
    console.log(location);
  
    useEffect(() => {
      getRequests();
    }, [])
  
    async function getRequests() {
      try {
        const { data, error } = await supabase
          .from("requests")
          .select("*")
          .limit(10)
        if (error) throw error;
        if (data != null) {
          setRequest(data); // [product1,product2,product3]
        }
      } catch (error) {
        alert(error.message);
      }
    }
  
    async function createRequest() {
      try {
        const { data, error } = await supabase
          .from("requests")
          .insert({
            name: name,
            location: location,
          })
          .single()
          
        if (error) throw error;
        window.location.reload();
      } catch (error) {
        alert(error.message);
      }
    }
  
    console.log(requests);






































    const [currLocation, setCurrLocation] = useState({})
    useEffect(() => {
        getlocation()

    }, []);


    const getlocation = async () => {
        const location = await axios.get('https://ipapi.co/json/xml')
        setCurrLocation(location.data)
    }
    
    





    const navigate = useNavigate();
    return(
        <>
        

        
        

        <div className="herose">
            <div className="rj">
                <nav className="navbar">
                
                    <img className="logo" src="logo.PNG" alt="" />
                    <a href="/Community" className="navbar-item">Contribute</a>
                    <a href="#" className="navbar-item">About This</a>
                    <a href="#" className="navbar-item">Volunteer</a>
                    
                    <button onClick={()=> navigate("/community")} className="navbar-item login-btn">Raise Request</button>

                    <UserButton/>
                </nav>

                <div className="heros" style={{ display: "flex" }}>


                <div className="sosec">

               

                <button  className="SOS" onClick={() => createRequest()} >ASK HELP NOW   SOS</button>

                </div>

                <div className="map">
                <iframe className="map" scrolling="no" src="https://kartaview.org/map/@28.613461517356427,77.21140284734679,13z" title="description"></iframe>
                  
                

                </div>



                


                </div>

                <div>
                    <h2 className="h4">CURRENT REQUESTS</h2>
                    <Row xs={1} lg={3} classname = 'g-4'>
                        {requests.map((request) => 
                        (
                            <Col>
                                <ProductCard request={request} />
                            </Col>
                        ))}




                    </Row>
                    
                </div>
                

                
            </div>


            


            



            
        </div>

        



        </>
        

        

       
    )
    
}


export default ProtectedPage;
