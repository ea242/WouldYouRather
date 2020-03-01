import React, { Component } from 'react'
import { connect } from 'react-redux'

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class QuestionsBoard extends Component {
    render() {
        return (
            <Container>
                {this.props.questionIds.map((id) => (
                    <Row key={id}>
                        <Col md={{ span: 6, offset: 3 }}>
                            {id}
                        </Col>
                    </Row>
                ))}
            </Container>
        )
    }
}
// need to check thislogic
function mapStateToProps({ questions }) {
    return{
        questionIds: Object.keys(questions)
    }
}


export default connect(mapStateToProps)(QuestionsBoard)