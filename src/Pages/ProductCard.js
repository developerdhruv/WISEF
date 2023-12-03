import {Card, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from '../supabaseClient';
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import ProtectedPage from '../ProtectedPage';
import { useEffect } from 'react';
import axios from 'axios';







function ProductCard(props) {
    const [currLocation, setCurrLocation] = useState({})
    useEffect(() => {
        getlocation()

    }, []);


    const getlocation = async () => {
        const location = await axios.get('https://ipapi.co/json/')
        setCurrLocation(location.data)


    }

    

   



{/*const Location = () => {


const location = UseGeolocation();
}



const UseGeolocation = () => {
    const [location, setLocation] = useState({
        loaded:false,
       coordinates: { lat:'',lng:''}
        
    });


    const onSuccess = location => {
        setLocation({
            loaded:true,
            coordinates:{
                lat:location.coords.latitude,
                lng:location.coords.longitude,
            },
        });





    }

    const onError = error => {
        setLocation({
            loaded:true,
            error,
        });
    }


        




    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code:0,
                message:"Geolocation not supported",
            });
            
            setLocation((state)=>({
                ...state,
                loaded:true,
                error:{
                    code:0,
                    message:"Geolocation not supported"
                }
            }))
            
        }


        navigator.geolocation.getCurrentPosition(onSuccess,onError);

    })




};

*/}
















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


    if (request) {
        return <Card class="card" style={{width: "18rem"}}>
            <Card.Body>
                { editing == false ?
                    <>
                        <Card.Title>{request.name}</Card.Title>
                        <Card.Text>{ currLocation.longitude +'  '+ currLocation.latitude}</Card.Text>
                        <Button >INFORM Police</Button>
                       
                        
                        
                        
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
            
            <></>
        )
    }
   
    
 return (

       
    <Card class="card" style={{width: "18rem"}}>
         <Card.Body>
             { editing == false ?
                 <>
                     <Card.Title>{request.name}</Card.Title>
                     <Card.Text>{currLocation.city  +'  '+ currLocation.latitude+'  '+        currLocation.longitude}</Card.Text>
                        
                        
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
 )

 
}




export default ProductCard;