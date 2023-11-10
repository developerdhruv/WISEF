
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, Row, Col, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import ProductCard from './Pages/ProductCard';
import { supabase } from './supabaseClient';
import ProtectedPage from './ProtectedPage';
import './App.css'






// IEVMMvL3YM3zbOu4

// Create the user interface (Navbar, Form to create products, product card)
// Setup supabase, create a table for our products
// Implement the CRUD logic for the products

function Community() {
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

  return (
    <>
      <Navbar>
        <Container>
          <Navbar.Brand>WISEF</Navbar.Brand>
          <Nav>
            <Nav.Item>Created by Dhruv Kumar</Nav.Item>
          </Nav>
        </Container>
      </Navbar>
      <Container>
        <Row>
          <Col xs={12} md={8}>
            <h3>Create Immediate Request for Help</h3>
            <Form.Label>Your Name</Form.Label>
            <Form.Control
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
            />
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              id="description"
              onChange={(e) => setLocation(e.target.value)}
            />
            <br></br>
            <Button onClick={() => createRequest()}>Create Immediate Request</Button>
          </Col>
        </Row>
        <hr></hr>
        <h3>Current Requests</h3>
        <Row xs={1} lg={3} className="g-4">
          {requests.map((request) => (
            <Col>
              <ProductCard request={request} /> {/* product={product} */}
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Community;