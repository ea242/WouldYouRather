import React, { Component, Fragment } from 'react'
// import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
// import Nav from './Nav'
import 'bootstrap/dist/css/bootstrap.min.css';

//import LogIn from './LogIn'
import QuestionAdd from './QuestionAdd'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return(
      <div className="App">
        <LoadingBar />
        <QuestionAdd />
      </div>
    )
  }
}

function mapStateToProps({authedUser}) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
