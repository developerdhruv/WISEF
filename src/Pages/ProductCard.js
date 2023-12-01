import {Card, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedPage from '../ProtectedPage';
import { useEffect } from 'react';
import axios from 'axios';





function Message() {
    var sid ='AC395bf61fa4c08c68020b9287e0594212';
    var token ='734bd61fcda20399c3bb1ad0b8261639';
    var twilo = require('twilio')(sid,token);
    twilo.messages.create({
        body:'currlocation.latitude + currlocation.longitude + "Here are the location please reachout to the victim"',
        from:'+16782646991',
        to:'+919837325618'
    }).then((message)=>console.log('MESSAGE SENT'));
}


function ProductCard(props) {
    const [currLocation, setCurrLocation] = useState({})
    useEffect(() => {
        getlocation()

    }, []);


    const getlocation = async () => {
        const location = await axios.get('https://ipapi.co/json/')
        setCurrLocation(location.data)
    }







    const request = props.request;

    const [ editing, setEditing ] = useState(false);
    const [ name, setName ] = useState(request.name);
    const [ location, setLocation ] = useState(request.location);

    async function updateRequest() {
        try {
            const { data, error } = await supabase
                .from("requests")
                .update({
                    name: name,
                    location: location,
                })
                .eq("id", request.id)
            
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }

    async function deleteRequest() {
        try {
            const { data, error } = await supabase
                .from("requests")
                .delete()
                .eq("id", request.id)
            
            if (error) throw error;
            window.location.reload();
        } catch (error) {
            alert(error.message);
        }
    }


    if (currLocation.city !== undefined) {
        return <Card class="card" style={{width: "18rem"}}>
            <Card.Body>
                { editing == false ?
                    <>
                        <Card.Title>{request.name}</Card.Title>
                        <Card.Text>{currLocation.city  +'  '+ currLocation.latitude+'  '+        currLocation.longitude}</Card.Text>
                        <Button onClick={Message}>INFORM Police</Button>
                        <Button onClick={() => deleteRequest()}>Delete Request</Button>
                        
                        
                    </>
                :
                    <>
                        <h4 className='h4'>UPDATE REQUEST</h4>
                        <Button size="sm" onClick={() => setEditing(false)}>Go Back</Button>
                        <br></br>
                        <Form.Label>VICTIM NAME</Form.Label>
                        <Form.Control
                            type="text" 
                            id="name"
                            defaultValue={request.name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Form.Label>Incident Location</Form.Label>
                        <Form.Control
                            type="text"
                            id="description"
                            defaultValue={request.location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                        <br></br>
                        <Button onClick={() => updateRequest()}>Update Product in Supabase DB</Button>
                    </>
                }
            </Card.Body>
        </Card>
    } else {
        return (
            <div>
                
                {/* TODO: Add Shimmer Effect from React-shimmer-component */}
            </div>
        )
    }
   
    
    // return (

       
    //    <Card class="card" style={{width: "18rem"}}>
    //         <Card.Body>
    //             { editing == false ?
    //                 <>
    //                     <Card.Title>{request.name}</Card.Title>
    //                     <Card.Text>{currLocation.city  +'  '+ currLocation.latitude+'  '+        currLocation.longitude}</Card.Text>
                        
                        
    //                 </>
    //             :
    //                 <>
    //                     <h4 className='h4'>UPDATE REQUEST</h4>
    //                     <Button size="sm" onClick={() => setEditing(false)}>Go Back</Button>
    //                     <br></br>
    //                     <Form.Label>VICTIM NAME</Form.Label>
    //                     <Form.Control
    //                         type="text" 
    //                         id="name"
    //                         defaultValue={request.name}
    //                         onChange={(e) => setName(e.target.value)}
    //                     />
    //                     <Form.Label>Incident Location</Form.Label>
    //                     <Form.Control
    //                         type="text"
    //                         id="description"
    //                         defaultValue={request.location}
    //                         onChange={(e) => setLocation(e.target.value)}
    //                     />
    //                     <br></br>
    //                     <Button onClick={() => updateRequest()}>Update Product in Supabase DB</Button>
    //                 </>
    //             }
    //         </Card.Body>
    //     </Card>
    // )
}

export default ProductCard;