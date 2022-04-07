// import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { removeComment } from '../../api/comments'

const ShowComment = (props) => {
    // most of these are simply to pass to edit modal
    const {comment, user, adventure, triggerRefresh} = props

    // const [commentOwner, setCommentOwner] = useState(null)





    const destroyComment = () => {
        removeComment(user, adventure._id, comment._id)
            .then(() => triggerRefresh())
            // if there is an error, we'll send an error message
            .catch(console.error)
    }

    
    return (
        <>
            <Card className="m-2 w-50 shadow p-3 mb-5 bg-body rounded">
                <Card.Header>
                    author: {comment.owner}
                    {
                        user._id === comment.owner &&
                            <>
                                <div className="float-end">
                                <Button className='btn-sm' onClick={() => destroyComment()}variant="danger">
                                    X
                                </Button>
                                </div>
                            </>
                    }
                </Card.Header>
                <Card.Body>
                    <small>{comment.note}</small><br/>
                </Card.Body>
            </Card>
        </>
    )
}

export default ShowComment