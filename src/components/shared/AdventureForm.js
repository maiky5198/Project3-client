
  
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
                    placeholder="how long was your adventure (minutes)?"
                    value={adventure.time}
                    type="number"
                    name='time'
                    onChange={handleChange}
                />
               <Form.Label>Distance</Form.Label>
                <Form.Control 
                    placeholder="what was the distance of your adventure (miles)?"
                    value={adventure.distance}
                    name='distance'
                    onChange={handleChange}
                />
                <Form.Label>difficultyLevel</Form.Label>
                <Form.Control 
                    placeholder="how difficult was your adventure on a scale of 0-5?"
                    value={adventure.difficultyLevel}
                    type="number"
                    name='difficultyLevel'
                    min="0"
                    max="5"
                    onChange={handleChange}
                />
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    placeholder="where was your adventure?"
                    value={adventure.location}
                    name='location'
                    onChange={handleChange}
                />
                <Form.Label>Geolocation</Form.Label>
                <Form.Control 
                    placeholder="latitude and longitude of adventure?"
                    value={adventure.geolocation}
                    name='geolocation'
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AdventureForm