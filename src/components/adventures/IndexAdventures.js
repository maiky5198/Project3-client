import React, { useState, useEffect } from 'react'
import { getAllAdventures } from '../../api/adventures'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {indexAdventuresSuccess, indexAdventuresFailure} from '../shared/AutoDismissAlert/messages'
import fishing from '../../images/fishing.png'
import hiking from '../../images/man-climbing-on-mountain.png'
import jogging from '../../images/jogging.png'
import biking from '../../images/mountain-biking.png'
// I'm going to declare a style object
// this will be used to corral my cards
// we can use basic CSS, but we have to use JS syntax
const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const IndexAdventures = (props) => {
    const [adventures, setAdventures] = useState(null)

    const {user, msgAlert} = props

    useEffect(() => {
        getAllAdventures()
            .then(res => {
                console.log('res.data.adventures', res.data.adventures)
                setAdventures(res.data.adventures)
            })
            .then(() => {
                msgAlert({
                    heading: 'Index page of adventures!',
                    message: indexAdventuresSuccess,
                    variant: 'success',
                })
            })
            .catch(() => {
                msgAlert({
                    heading: 'No adventures?!!',
                    message: indexAdventuresFailure,
                    variant: 'danger',
                })
            })
    }, [])

    if (!adventures) {
        return <p>loading...</p>
    } else if (adventures.length === 0) {
        return <p>no adventures yet, go add some</p>
    }

    let adventureCards

    if (adventures.length > 0) {
        adventureCards = adventures.map(adventure => {
            let activity 
             if (adventure.type === 'Walk' || adventure.type === 'Trail Run' || adventure.type === 'Road Run'){
                    activity = jogging
                }
             if (adventure.type === 'Road Bike' || adventure.type === 'Mountain Bike'){
                    activity = biking
                } 
             if (adventure.type === 'Hike'){
                    activity = hiking
                } 
             if (adventure.type === 'Fishing'){
                    activity = fishing
                } 
               
            return (
                <Card key={adventure._id} style={{width: '30%' }} className="m-2">
                    <img src= {activity} className= 'card-img-top'></img>
                    <Card.Header>{adventure.name} </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Link className='viewAdventure' to={`/adventures/${adventure._id}`}>View {adventure.type}</Link>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        <span>by:</span><Link to={`/adventures/user/${adventure.owner._id}`}>{adventure.owner.email}</Link>
                    </Card.Footer>
                </Card>
            )
        })
    }

    return (
        <>
            <h3>All of the adventures</h3>
            <div style={cardContainerLayout}>
                {adventureCards}
            </div>
        </>
    )
}

export default IndexAdventures