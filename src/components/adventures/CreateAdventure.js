import React, { useState } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { createAdventure } from '../../api/adventures'
import {createAdventureSuccess, createAdventureFailure} from '../shared/AutoDismissAlert/messages'
import { useNavigate } from 'react-router-dom'
import AdventureForm from '../shared/AdventureForm'

const CreateAdventure = (props) => {
    const {user, msgAlert} = props
    console.log('user in create', user)
    const navigate = useNavigate()
    // we'll need two states
    const [adventure, setAdventure] = useState({name: '', type: '', time: '', distance: '', difficultyLevel: '', location: '', geolocation: ''})
    console.log('adventure in create', adventure)

    const handleChange = (e) => {
        // e === event
        e.persist()

        setAdventure(prevAdventure => {
            const name = e.target.name
            let value = e.target.value
            console.log('etarget type', e.target.type)
            if (e.target.type === 'number') {
                value = parseInt(e.target.value)
            } if(e.target.value == "Walk"){
                adventure.type = "Walk"
            } else if(e.target.value == "Road Run"){
                adventure.type = "Road Run"
            } else if(e.target.value == "Trail Run" ){
                adventure.type = "Trail Run"
            } else if(e.target.value == "Road Bike"){
                adventure.type = "Road Bike"
            } else if(e.target.value == "Mountain Bike"){
                adventure.type = "Mountain Bike"
            } else if(e.target.value == "Hike"){
                adventure.type = "Hike"
            } else if(e.target.value == "Fishing"){
                adventure.type = "Fishing"
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

        createAdventure(user, adventure)
            // if create is successful, we should navigate to the show page
            .then(res => {navigate(`/adventures/${res.data.adventure._id}`)})
            // then we send a success message
            .then(() =>
                msgAlert({
                    heading: 'Adventure Added! Success!',
                    message: createAdventureSuccess,
                    variant: 'success',
                }))
            // if there is an error, we'll send an error message
            .catch(() =>
                msgAlert({
                    heading: 'Oh No!',
                    message: createAdventureFailure,
                    variant: 'danger',
                }))
         console.log('this is the adventure', adventure)
    }

    return (
        <AdventureForm 
            adventure={adventure}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            heading="Add new adventure!"
        />
    )
}

export default CreateAdventure