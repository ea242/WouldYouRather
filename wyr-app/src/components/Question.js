import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ProgressBar from 'react-bootstrap/ProgressBar';

class Question extends Component {
    state = {
        answer: ''
    }
    handleChange = (e) => {
        const answer = e.target.id
        this.setState(() => ({
            answer
        }))
    }
    handleSubmit = (e) => {
        e.preventDefault()
        
        const { answer } = this.state
        const { dispatch, question, authedUser } = this.props
        const qid = question.id
        dispatch(handleSaveQuestionAnswer({authedUser, qid, answer}))
        
        this.setState(() => ({
            answer: ''
        }))
    }
    render() {
        const { question, questionUser, userAnswer, authedUser} = this.props
        const { answer } = this.state
        if (authedUser === '') {
            return <Redirect to='/login' />
        }
        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Card>
                            <Card.Header><h5>{questionUser.name} asks:</h5></Card.Header>
                            <Card.Body>
                                <Container>
                                    <Row>
                                        <Col md={4}>
                                            <Image src={questionUser.avatarURL} width={100} height={105} roundedCircle />
                                        </Col>
                                        <Col md={8}>
                                            {userAnswer === null
                                                ?
                                                <Form onSubmit={this.handleSubmit}>
                                                    <h4>Would You Rather ...</h4>
                                                    <Form.Group as={Row}>
                                                        <Col>
                                                            <Form.Check
                                                            type="radio"
                                                            label={question.optionOne.text}
                                                            name="wyr-question"
                                                            id="optionOne"
                                                            onChange={this.handleChange}
                                                            />
                                                            <Form.Check
                                                            type="radio"
                                                            label={question.optionTwo.text}
                                                            name="wyr-question"
                                                            id="optionTwo"
                                                            onChange={this.handleChange}
                                                            />
                                                        </Col>
                                                    </Form.Group>
                                                    <Button variant="primary" type="submit" disabled={answer === ''}>
                                                        Submit
                                                    </Button>
                                                </Form>
                                                :
                                                <Col>
                                                    <Row>
                                                        <h4>Results:</h4>
                                                    </Row>
                                                    <Row>
                                                        <Card
                                                            bg={ userAnswer === 'optionOne' ? 'success' : 'light'}
                                                            text={ userAnswer === 'optionOne' ? 'white' : 'black'}>
                                                            <Card.Body>
                                                                <Card.Title>Would you rather {question.optionOne.text}?</Card.Title>
                                                                <ProgressBar
                                                                    now={((question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))*100).toFixed(2)}
                                                                    label={`${((question.optionOne.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))*100).toFixed(2)}%`} />
                                                                <Card.Text className="text-center">
                                                                    {question.optionOne.votes.length} out of {question.optionOne.votes.length + question.optionTwo.votes.length} votes
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                        <br />
                                                    </Row>
                                                    <Row>
                                                        <Card
                                                            bg={ userAnswer === 'optionTwo' ? 'success' : 'light'}
                                                            text={ userAnswer === 'optionTwo' ? 'white' : 'black'}>
                                                            <Card.Body>
                                                                <Card.Title>Would you rather {question.optionTwo.text}?</Card.Title>
                                                                <ProgressBar
                                                                    now={((question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))*100).toFixed(2)}
                                                                    label={`${((question.optionTwo.votes.length / (question.optionOne.votes.length + question.optionTwo.votes.length))*100).toFixed(2)}%`} />
                                                                <Card.Text className="text-center">
                                                                    {question.optionTwo.votes.length} out of {question.optionOne.votes.length + question.optionTwo.votes.length} votes
                                                                </Card.Text>
                                                            </Card.Body>
                                                        </Card>
                                                    </Row>
                                                </Col>}
                                        </Col>
                                    </Row>
                                </Container>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, props) {
    const { question_id } = props.match.params
    const question = questions[question_id]
    const questionUser = users[question.author]
    let userAnswer = null
    userAnswer = question.optionOne.votes.includes(authedUser) ? 'optionOne' : userAnswer;
    userAnswer = userAnswer !== 'optionOne' && question.optionTwo.votes.includes(authedUser) ? 'optionTwo' : userAnswer;
    return {
        question,
        questionUser,
        authedUser,
        userAnswer
    }
}


export default connect(mapStateToProps)(Question)