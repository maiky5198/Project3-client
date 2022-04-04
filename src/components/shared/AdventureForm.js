
  
import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const AdventureForm = (props) => {
    
    const {adventure, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    placeholder="what is the name of your adventure?"
                    value={adventure.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label>Type</Form.Label>
                <Form.Control 
                    placeholder="what type of adventure are you logging?"
                    value={adventure.type}
                    name='type'
                    onChange={handleChange}
                />
                <Form.Label>Time</Form.Label>
                <Form.Control 
                    placeholder="how long was your adventure?"
                    value={adventure.time}
                    type="number"
                    name='time'
                    onChange={handleChange}
                />
               <Form.Label>Distance</Form.Label>
                <Form.Control 
                    placeholder="what was the distance of your adventure?"
                    value={adventure.distance}
                    type="number"
                    name='time'
                    onChange={handleChange}
                />
                <Form.Label>Time</Form.Label>
                <Form.Control 
                    placeholder="how long was your adventure?"
                    value={adventure.time}
                    type="number"
                    name='time'
                    onChange={handleChange}
                />
                <Form.Label>Time</Form.Label>
                <Form.Control 
                    placeholder="how long was your adventure?"
                    value={adventure.time}
                    type="number"
                    name='time'
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AdventureForm