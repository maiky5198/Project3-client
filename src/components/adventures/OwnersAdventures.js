import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getOwnerAdventures } from '../../api/adventures'
import { Card, Spinner, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'


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
            
    }, [])

    
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
        adventureCards = ownersAdventures.map(adventure => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
            <Card key={adventure._id} style={{ width: '30%' }} className="m-2">
                <Card.Header>{adventure.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/adventures/${adventure._id}`}>View {adventure.type}</Link>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Link to={`/adventures/user/${adventure.owner._id}`}>by: {adventure.owner.email}</Link>
                </Card.Footer>
            </Card>
        ))
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