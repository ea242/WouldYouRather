import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation'
import QuestionsBoard from './QuestionsBoard'
import QuestionAdd from './QuestionAdd'
import Question from './Question'
import ScoreBoard from './ScoreBoard'
import LogIn from './LogIn'


class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    const { loading } = this.props
    
    return(
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='App'>
            {loading === true
              ? null 
              : <div>
                  <Navigation />
                  <LoadingBar />
                  <Route path='/' exact component={QuestionsBoard} />
                  <Route path='/login' component={LogIn} />
                  <Route path='/questions/:question_id' component={Question} />
                  <Route path='/add' component={QuestionAdd} />
                  <Route path='/leaderboard' component={ScoreBoard} />
                </div>}
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
