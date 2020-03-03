import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import LogInImage from '../images/log-in.png'

class LogIn extends Component {
    state = {
        id: ''
    }
    handleChange = (e) => {
        const id = e.target.value
        this.setState(() => ({
            id
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        
        const { id } = this.state
        const { dispatch, location} = this.props

        dispatch(setAuthedUser(id))
        
        this.setState(() => ({
          id: ''
        }))
        this.props.history.push(location.state && location.state.stateName ? location.state.stateName : '/')
    }
    render() {
    const {users, userIds} = this.props
    const {id} = this.state
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card className="text-center">
                            <Card.Header>Would You Rather</Card.Header>
                            <Card.Body>
                                <Card.Title>Welcome to Would You Rather App!</Card.Title>
                                <Card.Img variant="top" src={LogInImage} />
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="log-in-form">
                                        <Form.Label>Please log in with a user.</Form.Label>
                                        <Form.Control as="select" onChange={this.handleChange}>
                                            <option></option>
                                            {userIds.map((id) => (
                                                <option key={id} value={id}>
                                                    {users[id].name}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Form.Group>
                                    <Button variant="primary" type="submit" disabled={id === ''}>
                                        Log In
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users,
        userIds: Object.keys(users)
    }
}


export default withRouter(connect(mapStateToProps)(LogIn))