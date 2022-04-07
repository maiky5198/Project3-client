import React, { useState } from 'react'
import { Form, Container, Button, FormSelect, select, Option } from 'react-bootstrap'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom'

const AdventureForm = (props) => {
    const [difficulty, setdifficulty] = useState(0)
    const [type, setType] = useState()
    const {adventure, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    style={{
                        width: '50%'
                    }}
                    placeholder="What is The Name of Your Adventure?"
                    value={adventure.name}
                    name='name'
                    onChange={handleChange}
                />
                <br></br>
                <div>
                <h6>Adventure Type</h6>
                    <select 
                        style={{
                            width: '50%'
                        }}
                        class="form-select form-select-md mb-3" id="types" value={adventure.type}
                        onChange={handleChange}>
                                <option value="Walk">Walk</option>
                                <option value="Road Run">Road Run</option>
                                <option value="Trail Run">Trail Run</option>
                                <option value="Road Bike">Road Bike</option>
                                <option value="Mountain Bike">Mountain Bike</option>
                                <option value="Hike">Hike</option>
                                <option value="Swim">Fishing</option>
                    </select>
                </div>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    style={{
                        width: '50%'
                    }} 
                    placeholder="Description of your adventure?"
                    value={adventure.description}
                    name='time'
                    onChange={handleChange}
                />
                <br></br>
                <Form.Label>Time</Form.Label>
                <Form.Control
                    style={{
                        width: '50%'
                    }} 
                    placeholder="How Long Was Your Adventure (Minutes)?"
                    value={adventure.time}
                    type="number"
                    name='time'
                    onChange={handleChange}
                />
                <br></br>
               <Form.Label>Distance</Form.Label>
                <Form.Control 
                    style={{
                        width: '50%'
                    }}
                    placeholder="What Was The Distance of Your Adventure?"
                    value={adventure.distance}
                    name='distance'
                    type="number"
                    onChange={handleChange}
                />
                <br></br>
                <Form.Label>Difficulty Level</Form.Label>
                <p style={{
                    border: '1px solid #d3d3d3',
                    borderRadius: '5px',
                    textAlign: 'center',
                    width: '5%',
                    padding: '7px'
                    }}>{adventure.difficultyLevel}</p>
                        <Form.Control 
                            style={{
                                border: 'none'
                            }}
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
                   <br></br>
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
                    style={{
                        width: '50%'
                    }} 
                    placeholder="Zip Code of Your Adventure?"
                    value={adventure.location}
                    name='location'
                    onChange={handleChange}
                    minlength="5"
                    maxlength="5"
                />
                {/* <Form.Label>Geo location</Form.Label> */}
                {/* <Form.Control 
                    placeholder="Latitude And Longitude of Adventure?"
                    value={adventure.geolocation}
                    name='geolocation'
                    onChange={handleChange}
                /> */}
                <br></br>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AdventureForm