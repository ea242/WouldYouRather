import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { withRouter } from 'react-router-dom'
import { Redirect } from 'react-router-dom'
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class QuestionAdd extends Component {
    state = {
        optionOne: '',
        optionTwo: ''
    }
    handleChange = (e) => {
        const value = e.target.value;
        this.setState({
            ...this.state,
            [e.target.name]: value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault()
        
        const { optionOne, optionTwo } = this.state
        const { dispatch } = this.props
        
        dispatch(handleAddQuestion(optionOne, optionTwo))
        
        this.setState(() => ({
            optionOne: '',
            optionTwo: ''
        }))
        this.props.history.push('/')
    }
    render() {
    const {optionOne, optionTwo} = this.state
    const {authedUser} = this.props
    if (authedUser === '') {
        return <Redirect to='/login' />
    }
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Header><h5>Create New Question</h5></Card.Header>
                            <Card.Body>
                                <Card.Title>Would you rather...</Card.Title>
                                <Form onSubmit={this.handleSubmit}>
                                    <Form.Group controlId="optionOne">
                                        <Form.Control
                                            type="text"
                                            name="optionOne"
                                            value={optionOne} 
                                            onChange={this.handleChange}
                                            placeholder="Enter Option One Text Here" />
                                    </Form.Group>
                                    <Form.Group controlId="optionTwo">
                                        <Form.Label>OR</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="optionTwo"
                                            value={optionTwo} 
                                            onChange={this.handleChange}
                                            placeholder="Enter Option One Text Here" />
                                    </Form.Group>
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        disabled={optionOne === '' || optionTwo === ''}>
                                        Submit
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

function mapStateToProps({authedUser}) {
    return {
        authedUser
    }
}

export default withRouter(connect(mapStateToProps)(QuestionAdd))