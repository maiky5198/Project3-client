import React, {useState, useEffect, useRef} from 'react'
import { getOneAdventure, removeAdventure, updateAdventure } from '../../api/adventures'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import EditAdventureModal from './EditAdventureModal'
import AddGearModal from '../gear/AddGearModal'
import ShowGear from '../gear/ShowGear'
import CommentForm from '../comments/CommentForm'
import ShowComment from '../comments/ShowComment'
import axios from 'axios'
import mapboxgl from 'mapbox-gl'
require('dotenv').config()
const mapKey = process.env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken = `${mapKey}`
const weatherKey = process.env.REACT_APP_WEATHERAPIKEY


const ShowAdventures = (props) => {

    const [adventure, setAdventure] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [gearModalOpen, setGearModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()
    const [coordinates, setCoordinates] = useState(null)
    const [weather, setWeather] = useState(null)
    const [temp, setTemp] = useState(null)
    const mapContainer = useRef(null);
    const map = useRef(null)

    console.log('props in showAdventures', props)
    const { id } = useParams()
    const {user} = props
    console.log('id in showAdevtures', id)

    const getWeather = () => {
        let location = adventure.location
        axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${location},us&units=imperial&appid=${weatherKey}`)
                    .then(responseData => {
                        return responseData
                    })
                    .then(jsonData => {
                        console.log('coordinates in jsonData', jsonData.data.coord)
                        let jsonCoordinates = jsonData.data.coord
                        let jsonWeather = jsonData.data.weather[0]
                        let jsonTemp = jsonData.data.main.temp
                        setCoordinates(jsonCoordinates)
                        setWeather(jsonWeather)
                        setTemp(jsonTemp)
                    })
                    .catch(console.error)
        console.log('get weather function')
    }


    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        console.log('key', process.env.REACT_APP_WEATHERAPIKEY)
        getOneAdventure(id)
            .then(res => {
                setAdventure(res.data.adventure)
            })
            .catch(console.error)  
            // getWeather()   
    }, [updated])

    useEffect(()=> {
        if(coordinates) {
            if (map.current) return // initialize map only once
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: 'mapbox://styles/mapbox/streets-v11',
                center: [coordinates.lon, coordinates.lat],
                zoom: 15
            })
        } 
    }, [coordinates])

    const removeTheAdventure = () => {
        removeAdventure(user, adventure._id)
            .then(() => {navigate(`/adventures`)})
            .catch(console.error)
    }

    let gearCards
    let comments

    if(adventure){
        // getWeather()
        if (adventure.gear.length > 0) {
            gearCards = adventure.gear.map(gearItem => (
                // need to pass all props needed for updateGear func in edit modal
                <ShowGear 
                    key={gearItem._id} gear={gearItem} user={user} adventure={adventure} triggerRefresh={() => setUpdated(prev => !prev)}
                />
                // <p key={gearItem._id}>{gearItem.name}</p>
            ))
        }
        if(adventure.comments.length > 0){
            comments = adventure.comments.map(comment => (
                <ShowComment key={comment._id} updated={updated} comment={comment} adventure={adventure} user={user}  triggerRefresh={() => setUpdated(prev => !prev)}/>
            ))
        }
    }

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
                <div>
                    <div ref={mapContainer} className="map-container" />
                </div>
                    <div id="displayBox">
                    <Card>
                        <Card.Header>{adventure.name}</Card.Header>
                        <Card.Body>
                            <Card.Text>
                            <small>Type: {adventure.type}</small><br/>
                            <small>Time: {adventure.time} minutes</small><br/>
                            <small>Distance: {adventure.distance} miles</small><br/>
                            <small>Difficulty Level: {adventure.difficultyLevel}</small><br/>
                            <small>Location: {adventure.location}</small><br/>
                            {weather &&
                            <>
                            <small>Current Weather: {weather.main}, {weather.description}</small><br/>
                            </>
                            }
                            {temp &&
                            <> 
                            <small>Current Temperature: {temp}°F</small><br/>
                            </>
                            }
                        </Card.Text>
                        <h4>Gear:</h4>
                        {adventure.gear.length > 0 ? 
                            <div className='gearBox'>
                                {gearCards}
                            </div>
                            :
                            <p>No gear required!</p>       
                        }   
                    </Card.Body>
                    {adventure.owner == user._id && 
                    <Card.Footer>
                            <Button onClick={() => setGearModalOpen(true)} className="m-2" variant="info">
                                Add gear!
                            </Button>
                            <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                                Edit Adventure
                            </Button>
                            <Button className="m-2" variant="danger" onClick={removeTheAdventure}>
                                Delete Adventure
                            </Button>
    
                    </Card.Footer>                        
                    }
                    <Button onClick={() => getWeather()}>Get Map</Button>
 
                </Card>
                </div>
            </Container>
            <div className='commentBox'> 
                {comments}
                <CommentForm user={user} adventure={adventure} triggerRefresh={() => setUpdated(prev => !prev)} heading="Comments"/>
            </div>
            <EditAdventureModal 
            adventure = {adventure}
            show={modalOpen}
            user={user}
            triggerRefresh={() => setUpdated(prev => !prev)}
            updateAdventure={updateAdventure}
            handleClose={() => setModalOpen(false)}
    
            />
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