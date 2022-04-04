import React, {useState, useEffect} from 'react'
import { getOneAdventure } from '../../api/adventures'
import { useParams } from 'react-router-dom'
import { Spinner, Container, Card } from 'react-bootstrap'

const ShowAdventures = (props) => {

    const [adventures, setAdventures] = useState(null)
    console.log('props in showAdventures', props)
    const { id } = useParams()
    console.log('id in showAdevtures', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneAdventure(id)
            .then(res => setAdventures(res.data.adventures))
            .catch(console.error)
    }, [id])

    if (!adventures) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }

    return (
        <Container className="fluid">
            <Card>
                <Card.Header>{adventures.fullTitle}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>Name: {adventures.name}</small><br/>
                        <small>Type: {adventures.type}</small><br/>
                        <small>Time: {adventures.time}</small><br/>
                        <small>Distance: {adventures.distance}</small><br/>
                        <small>Difficulty Level: {adventures.difficultyLevel}</small><br/>
                        <small>Location: {adventures.location}</small><br/>
                        <small>Gear: {adventures.gear}</small><br/>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default ShowAdventures