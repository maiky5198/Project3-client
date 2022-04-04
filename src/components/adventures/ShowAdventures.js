import React, {useState, useEffect} from 'react'
import { getOneAdventure, removeAdventure, updateAdventure } from '../../api/adventures'
import { useParams, useNavigate } from 'react-router-dom'
import { Spinner, Container, Card, Button } from 'react-bootstrap'
import EditAdventureModal from './EditAdventureModal'

const ShowAdventures = (props) => {

    const [adventure, setAdventure] = useState(null)
    const [modalOpen, setModalOpen] = useState(false)
    const [gearModalOpen, setGearModalOpen] = useState(false)
    const [updated, setUpdated] = useState(false)
    const navigate = useNavigate()
    console.log('props in showAdventures', props)
    const { id } = useParams()
    const {user} = props
    console.log('id in showAdevtures', id)
    // empty dependency array in useEffect to act like component did mount
    useEffect(() => {
        getOneAdventure(id)
            .then(res => setAdventure(res.data.adventure))
            .catch(console.error)
    }, [id])

    const removeTheAdventure = () =>{
        removeAdventure(user, adventure._id)
            .then(() => {navigate(`/`)})
            .catch(console.error)
    }

    let gearCards
    let comments

    if (!adventure) {
        return (
            <Container fluid className="justify-content-center">
                <Spinner animation="border" role="status" variant="warning" >
                    <span className="visually-hidden">Loading....</span>
                </Spinner>
            </Container>
        )
    }
    return (
        <>
        <Container className="fluid">
            <Card>
                <Card.Header>{adventure.name}</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <small>Type: {adventure.type}</small><br/>
                        <small>Time: {adventure.time} minutes</small><br/>
                        <small>Distance: {adventure.distance} miles</small><br/>
                        <small>Difficulty Level: {adventure.difficultyLevel}</small><br/>
                        <small>Location: {adventure.location}</small><br/>
                        {/* <small>Gear: {adventure.gear}</small><br/> */}
                    </Card.Text>
                </Card.Body>
                {adventure.owner == user._id &&       
                <Card.Footer>
                        <Button onClick={() => setModalOpen(true)} className="m-2" variant="warning">
                            Edit Adventure
                        </Button>
                        <Button className="m-2" variant="danger" onClick={removeTheAdventure}>
                            Delete Adventure
                        </Button>

                </Card.Footer>
                }
            </Card>
        </Container>
        <EditAdventureModal 
        adventure = {adventure}
        show={modalOpen}
        user={user}
        // msgAlert={msg}
        triggerRefresh={() => setUpdated(prev => !prev)}
        updateAdventure={updateAdventure}
        handleClose={() => setModalOpen(false)}

        />
        </>
    )
}

export default ShowAdventures