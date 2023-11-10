import {Card, Button, Form} from 'react-bootstrap';
import { useState } from 'react';
import { supabase } from '../supabaseClient';

function ProductCard(props) {
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

    return (
        <Card style={{width: "18rem"}}>
            <Card.Body>
                { editing == false ?
                    <>
                        <Card.Title>{request.name}</Card.Title>
                        <Card.Text>{request.location}</Card.Text>
                        <Button variant="danger" onClick={() => deleteRequest()}>Delete Product</Button>
                        <Button variant="secondary" onClick={() => setEditing(true)}>Edit Product</Button>
                    </>
                :
                    <>
                        <h4>UPDATE REQUEST</h4>
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