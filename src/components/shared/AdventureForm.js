import { Form, Container, Button, Row, Col } from 'react-bootstrap'

const AdventureForm = (props) => {
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
            <Form onSubmit={handleSubmit} className="m-2 p-5 w-100 shadow bg-body rounded">
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
                {/* dropdown menu to select an adventure type */}
                <Form.Label>Adventure Type</Form.Label>
                    <select 
                        style={{
                            width: '100%',
                            textAlign: 'center'
                        }}
                        className="form-select form-select-md mb-3" id="types" value={adventure.type}
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
                    name='description'
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
                        {/* slider to select difficulty level */}
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
                    minLength="5"
                    maxLength="5"
                />
                <br></br>
                </Col>
            </Row>
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default AdventureForm