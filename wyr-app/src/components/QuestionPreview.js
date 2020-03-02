import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

class QuestionPreview extends Component {
    handleClick = (e, id) => {
        e.preventDefault()
        this.props.history.push(`/questions/${id}`)
    }
    render() {
        const { questionUser, commonWords, id} = this.props
        return (
            <Card>
                <Card.Header><h5>{questionUser.name} asks:</h5></Card.Header>
                <Card.Body>
                    <Container>
                        <Row>
                            <Col md={4}>
                                <Image src={questionUser.avatarURL} width={100} height={105} roundedCircle />
                            </Col>
                            <Col md={8}>
                                {commonWords.map((word) => (
                                    `... ${word} `
                                ))}...
                                <br />
                                <br />
                                <Button variant="primary" onClick={(e) => this.handleClick(e, id)}>
                                    View Poll
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({ questions, users }, { id }) {
    const question = questions[id]
    const questionUser = users[question.author]
    const commonWords = question.optionOne.text.split(' ').filter(value => question.optionTwo.text.split(' ').includes(value))
    return {
        questionUser,
        commonWords,
        id
    }
}


export default withRouter(connect(mapStateToProps)(QuestionPreview))