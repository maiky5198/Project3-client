import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import { addGear } from '../../api/gear'
import GearForm from '../shared/GearForm'

const AddGearModal = (props) => {
    const { user, show, handleClose, adventure, triggerRefresh } = props
    const [gear, setGear] = useState({})

    const handleChange = (e) => {
        // e === event
        e.persist()

        //sets gear the value of the input fields
        setGear(prevGear => {
            const name = e.target.name
            let value = e.target.value
            // console.log('etarget type', e.target.type)
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
        //api call to create a new piece of gear
        addGear(user, adventure._id, gear)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    return (
        //pop up displaying the gear form
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <GearForm
                    gear={gear}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Add some gear!"
                />
            </Modal.Body>
        </Modal>
    )
}

export default AddGearModal
