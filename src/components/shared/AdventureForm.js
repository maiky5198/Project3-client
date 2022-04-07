import React, { useState } from 'react'
import { Form, Container, Button, FormSelect, select, Option, Row, Col } from 'react-bootstrap'
import { __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED } from 'react-dom'

const AdventureForm = (props) => {
    const [difficulty, setdifficulty] = useState(0)
    const [type, setType] = useState()
    const {adventure, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <br></br>
            <h1>{heading}</h1>
            <br></br>
            <Form onSubmit={handleSubmit}>
            <Row>
                <Col>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    style={{
                        width: '100%',
                        textAlign: 'center'
                    }}
                    placeholder="What is The Name of Your Adventure?"
                    value={adventure.name}
                    name='name'
                    onChange={handleChange}
                />
                </Col>
                <Col>
                <div>
                <Form.Label>Adventure Type</Form.Label>
                    <select 
                        style={{
                            width: '100%',
                            textAlign: 'center'
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
                </Col>
            </Row>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    style={{
                        width: '100%',
                        textAlign: 'center'
                    }} 
                    placeholder="Description of your adventure?"
                    value={adventure.description}
                    name='time'
                    onChange={handleChange}
                />
                <br></br>
            <Row>
                <Col>
                    <Form.Label>Time</Form.Label>
                        <Form.Control
                            style={{
                            width: '100%',
                            textAlign: 'center'
                        }} 
                        placeholder="How Long Was Your Adventure (Minutes)?"
                        value={adventure.time}
                        type="number"
                        name='time'
                        onChange={handleChange}
                />
                </Col>
                <br></br>
                <Col>
                    <Form.Label>Distance</Form.Label>
                        <Form.Control 
                            style={{
                                width: '100%',
                                textAlign: 'center'
                            }}
                            placeholder="What Was The Distance of Your Adventure?"
                            value={adventure.distance}
                            name='distance'
                            type="number"
                            onChange={handleChange}
                />
                </Col>
                    </Row>
                <br></br>
                <Row style={{
                    textAlign: 'center',
                    justifyContent: 'center'
                }}>
                    <Col style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Form.Label>Difficulty Level</Form.Label>
                            <div style={{
                                border: '1px solid #d3d3d3',
                                borderRadius: '5px',
                                textAlign: 'center',
                                width: '5%',
                                padding: '7px'
                                }}>{adventure.difficultyLevel}</div>
                            <Form.Control 
                                style={{
                                    border: 'none',
                                    textAlign: 'center'
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
                    </Col>
                </Row>
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
            <Row>
                <Col style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                <Form.Label>Location</Form.Label>
                <Form.Control
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '50%',
                        textAlign: 'center'
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
                </Col>
            </Row>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AdventureForm