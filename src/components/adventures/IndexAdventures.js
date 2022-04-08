import React, { useState, useEffect } from 'react'
import { getAllAdventures } from '../../api/adventures'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {indexAdventuresSuccess, indexAdventuresFailure} from '../shared/AutoDismissAlert/messages'
import fishing from '../../images/fishing.png'
import hiking from '../../images/hiking.png'
import jogging from '../../images/jogging.png'
import biking from '../../images/biking.png'
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
        //api call to get all the adventures
        getAllAdventures()
            .then(res => {
                console.log('res.data.adventures', res.data.adventures)
                setAdventures(res.data.adventures)
            })
            .catch(console.error)
    }, [])

    //loading screen while api call happens
    if (!adventures) {
        return <p>loading...</p>
    } else if (adventures.length === 0) {
        return <p>no adventures yet, go add some</p>
    }

    let adventureCards

    if (adventures.length > 0) {
        adventureCards = adventures.map(adventure => {
            //sets the image on top of the cards depending on the adventure type
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
                <Card key={adventure._id} style={{width: '30%' }} className="m-2 shadow p-3 mb-5 bg-body rounded">
                    <img src= {activity} className= 'card-img-top'></img>
                    <Card.Header>{adventure.name} </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            <Link className='viewAdventure' to={`/adventures/${adventure._id}`}>View {adventure.type}</Link>
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        {/* link to all adventures made by a specific user */}
                        <span>by:</span><Link to={`/adventures/user/${adventure.owner._id}`}>{adventure.owner.email}</Link>
                    </Card.Footer>
                </Card>
            )
        })
    }

    return (
        <>
        <br></br>
            <div className= 'title'><h1>All of the adventures</h1></div>
            <div style={cardContainerLayout}>
                {adventureCards}
            </div>
        </>
    )
}

export default IndexAdventures