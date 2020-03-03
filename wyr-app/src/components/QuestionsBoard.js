import React, { Component } from 'react'
import { connect } from 'react-redux'
import QuestionPreview from './QuestionPreview'
import { Redirect } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class QuestionsBoard extends Component {
    render() {
        const { answeredIds, unansweredIds, authedUser} = this.props
        if (authedUser === '') {
            return <Redirect to={{
                pathname: "/login",
                state: { stateName: '/'}
              }} />
        } 

        return (
            <Container>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Tabs defaultActiveKey="unanswered" id="questions-tabs">
                            <Tab eventKey="unanswered" title="Unanswered Questions">
                                {unansweredIds.map((id) => (
                                    <QuestionPreview id={id} key={id} />
                                ))}
                            </Tab>
                            <Tab eventKey="awnsered" title="Answered Questions">
                                {answeredIds.map((id) => (
                                    <QuestionPreview id={id} key={id} />
                                ))}
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </Container>
        )
    }
}

function mapStateToProps({ questions, authedUser }) {
    return {
        authedUser,
        answeredIds: Object.keys(questions)
                        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
                        .filter((q) => {
                            return questions[q].optionOne.votes.concat(questions[q].optionTwo.votes).includes(authedUser);
                        }),
        unansweredIds: Object.keys(questions)
                        .sort((a,b) => questions[b].timestamp - questions[a].timestamp)
                        .filter((q) => {
                            return !questions[q].optionOne.votes.concat(questions[q].optionTwo.votes).includes(authedUser);
                        }),
    }
}


export default connect(mapStateToProps)(QuestionsBoard)