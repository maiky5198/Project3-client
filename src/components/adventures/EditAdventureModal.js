import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import AdventureForm from '../shared/AdventureForm'

const EditAdventureModal = (props) => {
    const { user, show, handleClose, updateAdventure, msgAlert, triggerRefresh } = props
    const [adventure, setAdventure] = useState(props.adventure)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setAdventure(prevAdventure => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            console.log('this is e.target checked', e.target.checked)
            if (e.target.type === 'number') {
                value = parseFloat(e.target.value)
            }

            const updatedValue = { [name]: value }

            console.log('prevAdventure', prevAdventure)
            console.log('updatedValue', updatedValue)

            return {...prevAdventure, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('the adventure to submit', adventure)
        updateAdventure(user, adventure)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            // then we send a success message
            // .then(() =>
            //     msgAlert({
            //         heading: 'Adventure Updated! Success!',
            //         message: 'Adventure successfully edited!',
            //         variant: 'success',
            //     }))
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
        console.log('this is the adventure', adventure)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
                <AdventureForm 
                    adventure={adventure}
                    handleChange={handleChange}
                    handleSubmit={handleSubmit}
                    heading="Edit adventure!"
                />
            </Modal.Body>
        </Modal>
    )
}
    
export default EditAdventureModal