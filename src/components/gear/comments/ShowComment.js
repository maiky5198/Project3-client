import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeComment } from '../../../api/comments'

const ShowComment = (props) => {
    // most of these are simply to pass to edit modal
    const {comment, user, adventure, triggerRefresh} = props

    const [commentOwner, setCommentOwner] = useState(null)





    const destroyComment = () => {
        removeComment(user, adventure._id, comment._id)
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    
    return (
        <>
            <Card className="m-2">
                <Card.Header></Card.Header>
                <Card.Body>
                    <small>{comment.note}</small><br/>
                    <Card.Footer >
                        author: {comment.owner}
                    </Card.Footer>
                    {
                        user._id === comment.owner &&
                            <>
                                <Button onClick={() => destroyComment()}variant="danger">
                                    X
                                </Button>
                            </>
                    }
                </Card.Body>
            </Card>
        </>
    )
}

export default ShowComment