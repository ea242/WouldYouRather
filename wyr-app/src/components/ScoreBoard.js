import React, { Component } from 'react'
import { connect } from 'react-redux'
import UserScore from './UserScore'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class ScoreBoard extends Component {
    render() {
        return (
            <Container>
                {this.props.usersIds.map((id) => (
                    <Row key={id}>
                        <Col md={{ span: 6, offset: 3 }}>
                            <UserScore id={id}/>
                        </Col>
                    </Row>
                ))}
            </Container>
        )
    }
}
// need to check thislogic
function mapStateToProps({ users }) {
    return{
        usersIds: Object.keys(users)
            .sort((a,b) => (Object.keys(users[b].answers).length + users[b].questions.length) - (Object.keys(users[a].answers).length + users[a].questions.length))
    }
}


export default connect(mapStateToProps)(ScoreBoard)