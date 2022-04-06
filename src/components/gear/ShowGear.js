import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import EditGearModal from './EditGearModal'
import { removeGear } from '../../api/gear'
import { Container } from 'react-bootstrap'

const ShowGear = (props) => {
    // most of these are simply to pass to edit modal
    const {gear, user, adventure, triggerRefresh} = props

    const [showEditModal, setShowEditModal] = useState(false)

    // const setBgCondition = (cond) => {
    //     if (cond === 'new') {
    //         return {width: '18rem', backgroundColor:'#b5ead7'}
    //     } else if (cond === 'used') {
    //         return {width: '18rem', backgroundColor:'#ffdac1'}
    //     } else {
    //         return {width: '18rem', backgroundColor:'#ff9aa2'}
    //     }
    // }

    const destroyGear = () => {
        removeGear(user, adventure._id, gear._id)
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    
    return (
        <>
            <Card className="m-2" style={{
                width: "15rem",
                alignment: "center",
            }}>
                <Card.Header>{gear.name}</Card.Header>
                <Card.Body>
                    <small>Quantity: {gear.quantity}</small><br/>
                    <small>{gear.description}</small><br/>
                    <Card.Footer >
                    </Card.Footer>
                    {
                        user._id === adventure.owner && 
                            <>
                                <Button variant="warning" onClick={() => setShowEditModal(true)}>
                                    Edit Gear
                                </Button>
                                <Button onClick={() => destroyGear()}variant="danger">
                                    Delete Gear
                                </Button>
                            </>
                    }
                </Card.Body>
            </Card>
            <EditGearModal 
                user={user}
                adventure={adventure}
                gear={gear}
                show={showEditModal}
                handleClose={() => setShowEditModal(false)}
                triggerRefresh={triggerRefresh}
            />
        </>
    )
}

export default ShowGear