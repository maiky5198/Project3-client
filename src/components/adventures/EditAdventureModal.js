import React, { useState } from 'react'
import {Modal} from 'react-bootstrap'
import AdventureForm from '../shared/AdventureForm'

const EditAdventureModal = (props) => {
    const { user, show, handleClose, updateAdventure, triggerRefresh } = props
    const [adventure, setAdventure] = useState(props.adventure)

    const handleChange = (e) => {
        // e === event
        e.persist()
        //sets Adventure to the updated value of the input fields
        setAdventure(prevAdventure => {
            const name = e.target.name
            let value = e.target.value
            // console.log('etarget type', e.target.type)
            // console.log('this is e.target checked', e.target.checked)
            if (e.target.type === 'number') {
                value = parseFloat(e.target.value)
            }
            //sets the value of adventure.type to the string within the select input
            if(e.target.value === "Walk"){
                adventure.type = "Walk"
            } else if(e.target.value === "Road Run"){
                adventure.type = "Road Run"
            } else if(e.target.value === "Trail Run" ){
                adventure.type = "Trail Run"
            } else if(e.target.value === "Road Bike"){
                adventure.type = "Road Bike"
            } else if(e.target.value === "Mountain Bike"){
                adventure.type = "Mountain Bike"
            } else if(e.target.value === "Hike"){
                adventure.type = "Hike"
            } else if(e.target.value === "Fishing"){
                adventure.type = "Fishing"
            } 

            const updatedValue = { [name]: value }

            // console.log('prevAdventure', prevAdventure)
            // console.log('updatedValue', updatedValue)

            return {...prevAdventure, ...updatedValue}
        })
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        // console.log('the adventure to submit', adventure)
        //api call to update an adventure
        updateAdventure(user, adventure)
            // if create is successful, we should navigate to the show page
            .then(() => handleClose())
            .then(() => triggerRefresh())
            .catch(console.error)
        // console.log('this is the adventure', adventure)
    }

    return (
        //this is the pop up that displays the adventure form for editing
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