import React, { useState } from 'react'
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
        <Container className="justify-content-center w-75 mt-5">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Add a comment</Form.Label>
                <Form.Control 
                    placeholder="..."        
                    value={comment.note}
                    name='note'
                    onChange={handleChange}
                />
                <Button type='submit' className='float-end m-1' >Submit</Button>
            </Form>
        </Container>
    )
}

export default CommentForm