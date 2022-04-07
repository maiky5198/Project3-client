import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOwnerAdventures } from '../../api/adventures'
import { Card, Spinner, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import fishing from '../../images/fishing.png'
import hiking from '../../images/hiking.png'
import jogging from '../../images/jogging.png'
import biking from '../../images/biking.png'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const OwnersAdventures = (props) => {
    const [ownersAdventures, setOwnersAdventures] = useState(null)

    const {user} = props

    const {ownerId} = useParams()

    useEffect(() => {
        console.log('user id', user._id)
        getOwnerAdventures(ownerId)
            .then(res => {
                console.log('res.data', res.data)
                setOwnersAdventures(res.data.adventures)
            })
            .catch(console.error)
            
    }, [user, ownerId])

    
    if (!ownersAdventures) {
        return ( 
                <Container fluid className='' >
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Container>
        )
    }
    if (ownersAdventures.length === 0) {
        return (
            <div> 
                <p>Could not find adventures by that user. What a sad life!</p>
            </div>
        )
    }

    let adventureCards

    if (ownersAdventures.length > 0) {
        adventureCards = ownersAdventures.map(adventure => {
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
                        <span>by:</span><Link to={`/adventures/user/${adventure.owner._id}`}>{adventure.owner.email}</Link>
                    </Card.Footer>
                </Card>
            )
        })
    }

    return (
        <>
            <h3> Adventures </h3>
            <div style={cardContainerLayout}>
                {adventureCards}
            </div>
        </>
    )
}

export default OwnersAdventures