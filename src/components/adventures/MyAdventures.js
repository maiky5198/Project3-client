import React, { useState, useEffect } from 'react'
import { getMyAdventures } from '../../api/adventures'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'


const cardContainerLayout = {
    display: 'flex',
    justifyContent: 'center',
    flexFlow: 'row wrap'
}

const MyAdventures = (props) => {
    const [myAdventures, setMyAdventures] = useState(null)

    const {user, msgAlert} = props

    useEffect(() => {
        console.log('user id', user._id)
        getMyAdventures(user)
            .then(res => {
                console.log('res.data', res.data)
                setMyAdventures(res.data.adventures)
            })
            .catch(console.error)
            
    }, [])

    if (!myAdventures) {
        return <p>loading...</p>
    }
    if (myAdventures.length === 0) {
        return <p>You have no adventures, go explore!</p>
    }

    let adventureCards

    if (myAdventures.length > 0) {
        adventureCards = myAdventures.map(adventure => (
            // one method of styling, usually reserved for a single style
            // we can use inline, just like in html
            <Card key={adventure._id} style={{ width: '30%' }} className="m-2">
                <Card.Header>{adventure.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Link to={`/adventures/${adventure._id}`}>View {adventure.type}</Link>
                    </Card.Text>
                </Card.Body>
            </Card>
        ))
    }

    return (
        <>
            <h3>All of my adventures</h3>
            <div style={cardContainerLayout}>
                {adventureCards}
            </div>
        </>
    )
}

export default MyAdventures