import { Form, Container, Button } from 'react-bootstrap'

const GearForm = (props) => {
    
    const {gear, handleChange, handleSubmit, heading} = props

    return (
        <Container className="justify-content-center">
            <h3>{heading}</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    placeholder="what is the name of your gear?"
                    value={gear.name}
                    name='name'
                    onChange={handleChange}
                />
                <Form.Label>Quantity</Form.Label>
                <Form.Control 
                    placeholder="what is the quantity of gear needed?"
                    value={gear.quantity}
                    name='quantity'
                    type="number"
                    onChange={handleChange}
                />
                <Form.Label>Description</Form.Label>
                <Form.Control 
                    placeholder="description of the gear needed?"
                    value={gear.description}
                    name='description'
                    onChange={handleChange}
                />
                <Button type='submit'>Submit</Button>
            </Form>
        </Container>
    )
}

export default GearForm