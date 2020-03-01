import React, { Component } from 'react'
import { connect } from 'react-redux'

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

class UserScore extends Component {
    render() {
        const {user} = this.props
        return (
            <Card>
                <Card.Header><h5>{user.name}</h5></Card.Header>
                <Card.Body>
                    <Card.Text>
                        <Container>
                            <Row>
                                <Col>
                                    <Image src={user.avatarURL} width={100} height={105} roundedCircle />
                                </Col>
                                <Col>
                                    <p className="align-middle">
                                        Answers: {Object.keys(user.answers).length}
                                        <br />
                                        Questions: {user.questions.length}
                                    </p>
                                </Col>
                                <Col>
                                    <Card className="text-center">
                                        <Card.Header>Score</Card.Header>
                                        <Card.Body>
                                            <h2>{Object.keys(user.answers).length + user.questions.length}</h2>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
}

function mapStateToProps({ users }, { id }) {
    const user = users[id]

    return {
        user
    }
}

export default connect(mapStateToProps)(UserScore)