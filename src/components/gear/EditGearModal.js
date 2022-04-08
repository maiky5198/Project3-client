
import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import GearForm from '../shared/GearForm'
import {updateGear} from '../../api/gear'

const EditGearModal = (props) => {
    const { user, adventure, show, handleClose, triggerRefresh } = props
    const [gear, setGear] = useState(props.gear)

    const handleChange = (e) => {
        // e === event
        e.persist()

        //sets gear to the updated values of the input fields
        setGear(prevGear => {
            const name = e.target.name
            let value = e.target.value

            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            }

            const updatedValue = { [name]: value }

            // console.log('prevGear', prevGear)
            // console.log('updatedValue', updatedValue)

            return {...prevGear, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        // console.log('the gear to submit', gear)
        //api call to update the gear
        updateGear(user, adventure._id, gear._id, gear)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    return (
        //popup displaying the edit gear form
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <GearForm
                    gear={gear}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit Gear"
                />
            </Modal.Body>
        </Modal>
    )
}

export default EditGearModal