import React, { useState, useEffect } from 'react'
import { Form, Container, Button } from 'react-bootstrap'
import { addComment } from '../../api/comments'

const CommentForm = (props) => {
    
    const { adventure, heading, triggerRefresh, user} = props
    const [comment, setComment] = useState("")



    const handleChange = (e) => {
        // e === event
        e.persist()

        setComment(prevComment => {
            const name = e.target.name
            let value = e.target.value

            const updatedValue = { [name]: value }

            console.log('prevComment', prevComment)
            console.log('updatedValue', updatedValue)

            return {...prevComment, ...updatedValue}
        })
    }

    const clearField = () => {
        setComment({note: ""})
    }

    const handleSubmit = (e) => {
        // e === event
        e.preventDefault()

        console.log('the comment to submit', comment)
        addComment(user, adventure._id, comment)
            .then(()=> clearField())
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Add a comment</Form.Label>
                <Form.Control 
                    placeholder="..."        
                    value={comment.note}
                    name='note'
                    onChange={handleChange}
                />
                {/* <Form.Label>Type</Form.Label>
                <Form.Control 
                    placeholder="what type of adventure are you logging?"
                    value={adventure.type}
                    name='type'
                    onChange={handleChange}
                />
                <Form.Label>Time</Form.Label>
                <Form.Control 
                    placeholder="how long was your adventure (minutes)?"
                    value={adventure.time}
                    type="number"
                    name='time'
                    onChange={handleChange}
                />
               <Form.Label>Distance</Form.Label>
                <Form.Control 
                    placeholder="what was the distance of your adventure (miles)?"
                    value={adventure.distance}
                    name='distance'
                    type="number"
                    onChange={handleChange}
                />
                <Form.Label>Difficulty Level</Form.Label>
                <p>{difficulty}</p>
                   <Form.Control 
                   type="range" 
                   onChange={handleChange} 
                   value={adventure.difficultyLevel}
                   name="difficultyLevel" 
                   className="form-range" 
                   min="0" 
                   max="5" 
                   step="1" 
                   id="customRange3"
                   />
                <Form.Label>Location</Form.Label>
                <Form.Control 
                    placeholder="where was your adventure?"
                    value={adventure.location}
                    name='location'
                    onChange={handleChange}
                />
                <Form.Label>Geo location</Form.Label>
                <Form.Control 
                    placeholder="latitude and longitude of adventure?"
                    value={adventure.geolocation}
                    name='geolocation'
                    onChange={handleChange}
                /> */}
                <Button type='submit' >Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm