import React, {useState, useEffect, useRef} from 'react'
import { getOneAdventure, removeAdventure, updateAdventure } from '../../api/adventures'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button, Row, Col } from 'react-bootstrap'
import EditAdventureModal from './EditAdventureModal'
import AddGearModal from '../gear/AddGearModal'
import ShowGear from '../gear/ShowGear'
import CommentForm from '../comments/CommentForm'
import ShowComment from '../comments/ShowComment'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
// mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
require('dotenv').config()
const mapKey = process.env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken = `${mapKey}`
console.log('mapkey?', mapKey)
const weatherKey = process.env.REACT_APP_WEATHERAPIKEY
console.log('weatherkey?', weatherKey)

const ShowAdventures = (props) => {
// setting state here
    const [adventure, setAdventure] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [gearModalOpen, setGearModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [coordinates, setCoordinates] = useState(null)
    const [weather, setWeather] = useState(null)
    const [temp, setTemp] = useState(null)
    const [mapHeight, setMapHeight] = useState('0px')
    const navigate = useNavigate()
    const mapContainer = useRef(null);
    const map = useRef(null)

    // console.log('props in showAdventures', props)
    const { id } = useParams()
    const {user} = props
    // console.log('id in showAdevtures', id)

    //this function executes a call to the open weather api so that we can get lat and lon as well as the weather
    const getWeather = () => {
        let location = adventure.location
        axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&appid=${weatherKey}`)
                    .then(responseData => {
                        return responseData
                    })
                    .then(jsonData => {
                        // console.log('coordinates in jsonData', jsonData.data.coord)
                        let jsonCoordinates = jsonData.data.coord
                        let jsonWeather = jsonData.data.weather[0]
                        let jsonTemp = jsonData.data.main.temp
                        //here we set the coordinates piece of state equal to the lat and lon of the zip code given in create adventure
                        setCoordinates(jsonCoordinates)
                        //here we set the weather
                        setWeather(jsonWeather)
                        //here we set the temp
                        setTemp(jsonTemp)
                    })
                    .catch(console.error)
        // console.log('get weather function')
    }


    // we put updated in the array so that the page will re-render every time we make an update and trigger the trigger refresh function
    useEffect(() => {
        // console.log('key', process.env.REACT_APP_WEATHERAPIKEY)
        //calls the api to get a specific adventure
        getOneAdventure(id)
            .then(res => {
                setAdventure(res.data.adventure)
            })
            .catch(console.error)  
    }, [updated, id])

    //we put coordinates in the array so that the mapbox map will redraw every time the coordinates change. We did this so it wouldn't try to render before we set coordinates
    useEffect(()=> {
        //if coordinates is truthy render the map
        if(coordinates) {
            //sets the map height so that it's bigger than zero
            setMapHeight('400px')
            if (map.current) return // initialize map only once
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                //center on the lat and lon taken from the zip code
                center: [coordinates.lon, coordinates.lat],
                zoom: 15
            })
        } 
    }, [coordinates])

    //delete's an adventure
    const removeTheAdventure = () => {
        removeAdventure(user, adventure._id)
            .then(() => {navigate(`/adventures`)})
            .catch(console.error)
    }

    //we declare these variables here so we can change them later
    let gearCards
    let comments

    //after we find an adventure, this checks for and renders gear and comments respectively
    if(adventure){
        if (adventure.gear.length > 0) {
            gearCards = adventure.gear.map(gearItem => (
                // need to pass all props needed for updateGear func in edit modal
                <ShowGear 
                    key={gearItem._id} gear={gearItem} user={user} adventure={adventure} triggerRefresh={() => setUpdated(prev => !prev)}
                />
            ))
        }
        if(adventure.comments.length > 0){
            comments = adventure.comments.map(comment => (
                <ShowComment key={comment._id} updated={updated} comment={comment} adventure={adventure} user={user}  triggerRefresh={() => setUpdated(prev => !prev)}/>
            ))
        }
    }

    //display a spinner if there isn't an adventure
    if (!adventure) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    if(adventure.name){
        return (
            <>
            <Container className="fluid" id="showContainer">
                    <Card className='shadow p-3 mb-5 bg-body rounded mt-3'>
                        <Card.Header><h2 style={{
                            textAlign: 'center'
                        }}>{adventure.name}</h2></Card.Header>
                        <Card.Body>
                            <Card.Text>
                            <Row>
                                <Col>
                                    <small>Type: {adventure.type}</small><br/>
                                </Col>
                                <Col>
                                    <small>Time: {adventure.time} Minutes</small><br/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <small>Distance: {adventure.distance} Miles</small><br/>
                                </Col>
                                <Col>
                                    <small>Difficulty Level: {adventure.difficultyLevel}</small><br/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <small>Location: {adventure.location}</small><br/>
                                </Col>
                                <Col>
                                    <small>Description: {adventure.description}</small><br/>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                {/* display the weather if the weather state is truthy */}
                                    {weather &&
                                    <>
                                        <small>Current Weather: {weather.main}, {weather.description}</small><br/>
                                    </>
                                    }
                                </Col>
                                <Col>
                                {/* display the temp if the temp state is truthy */}
                                    {temp &&
                                    <> 
                                        <small>Current Temperature: {temp}°F</small><br/>
                                    </>
                                    }
                                </Col>
                            </Row>
                        </Card.Text>
                        <h4>Gear:</h4>
                        {/* show gear cards if there is any, or a message indicating it's not necessary if there isn't */}
                        {adventure.gear.length > 0 ? 
                            <div className='gearBox'>
                                {gearCards}
                            </div>
                            :
                            <p>No gear required!</p>       
                        }   
                    </Card.Body>
                    {/* this is the mapbox map */}
                    <div>
                        <div ref={mapContainer} className="map-container" style={{height: `${mapHeight}`}}/>
                    </div>
                    {/* if the user owns this adventure allow them to add gear, edit, or delete it */}
                    {adventure.owner === user._id && 
                    <Card.Footer>
                            <Button onClick={() => setGearModalOpen(true)} className="m-2" variant="info">
                                Add Gear!
                            </Button>
                            <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                                Edit Adventure
                            </Button>
                            <Button className="m-2" variant="danger" onClick={removeTheAdventure}>
                                Delete Adventure
                            </Button>
    
                    </Card.Footer>                        
                    }
                    {/* this button triggers the function to get the weather and display the map */}
                    <Button onClick={() => getWeather()}>Get Map</Button>
                </Card>
            </Container>
            <div className='commentBox'> 
                <CommentForm user={user} adventure={adventure} triggerRefresh={() => setUpdated(prev => !prev)} heading="Comments"/>
                {comments}
            </div>
            {/* a pop up to edit the adventure */}
            <EditAdventureModal 
            adventure = {adventure}
            show={modalOpen}
            user={user}
            triggerRefresh={() => setUpdated(prev => !prev)}
            updateAdventure={updateAdventure}
            handleClose={() => setModalOpen(false)}
    
            />
            {/* a pop up to add the gear */}
            <AddGearModal
                show={gearModalOpen}
                user={user}
                adventure={adventure}
                triggerRefresh={() => setUpdated(prev => !prev)}
                handleClose={() => setGearModalOpen(false)}
            />
            </>
        )

    }
}

export default ShowAdventures