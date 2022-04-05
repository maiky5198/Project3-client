import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'

const AdventureForm = (props) => {
    const [difficulty, setdifficulty] = useState(0)
    
    const {adventure, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    placeholder="What is The Name of Your Adventure?"
                    value={adventure.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label>Type</Form.Label>
                <Form.Control 
                    placeholder="What Type of Adventure Are You Logging?"
                    value={adventure.type}
                    name='type'
                    onChange={handleChange}
                />
                <Form.Label>Time</Form.Label>
                <Form.Control 
                    placeholder="How Long Was Your Adventure (Minutes)?"
                    value={adventure.time}
                    type="number"
                    name='time'
                    onChange={handleChange}
                />
               <Form.Label>Distance</Form.Label>
                <Form.Control 
                    placeholder="What Was The Distance of Your Adventure (Miles)?"
                    value={adventure.distance}
                    name='distance'
                    type="number"
                    onChange={handleChange}
                />
                <Form.Label>Difficulty Level</Form.Label>
                <p>{adventure.difficultyLevel}</p>
                   <Form.Control 
                   type="range" 
                   value={adventure.difficultyLevel}
                   name="difficultyLevel" 
                   className="form-range" 
                   min="0" 
                   max="5" 
                   step="1" 
                   id="customRange3"
                   onChange={handleChange}
                   />
                {/* <Form.Label>Difficulty Level</Form.Label>
                <Form.Control 
                    // placeholder="how difficult was your adventure on a scale of 0-5?"
                    value={adventure.difficultyLevel}
                    class="form-range"
                    type="range"
                    name='difficultyLevel'
                    step="1"
                    min="0"
                    max="5"
                    for="customRange3"
                    id="customRange3"
                    onChange={handleChange}
                /> */}
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    placeholder="Where Was Your Adventure?"
                    value={adventure.location}
                    name='location'
                    onChange={handleChange}
                />
                {/* <Form.Label>Geo location</Form.Label> */}
                {/* <Form.Control 
                    placeholder="Latitude And Longitude of Adventure?"
                    value={adventure.geolocation}
                    name='geolocation'
                    onChange={handleChange}
                /> */}
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AdventureForm