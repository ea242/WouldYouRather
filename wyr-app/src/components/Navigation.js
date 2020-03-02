import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

class Navigation extends Component {
    handleClick = (e) => {
        e.preventDefault()
        const { dispatch } = this.props
        dispatch(setAuthedUser(''))
        this.props.history.push('/login')
    }
    render() {
        const {user} = this.props
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Would You Rather</Navbar.Brand>
                <Nav className="mr-auto">
                    <NavLink to='/' exact className="nav-link" activeClassName='active'>
                        Home
                    </NavLink>
                    <NavLink to='/add' className="nav-link" activeClassName='active'>
                        New Question
                    </NavLink>
                    <NavLink to='/leaderboard' className="nav-link" activeClassName='active'>
                        Leader Board
                    </NavLink>
                </Nav>
                { user !== '' &&
                    <div>
                        <Navbar.Text>
                            Hello, {user.name}
                        </Navbar.Text>
                        &nbsp;&nbsp;
                        <Image src={user.avatarURL} width={40} height={40} roundedCircle />
                        &nbsp;&nbsp;
                        <Button variant="outline-info" onClick={(e) => this.handleClick(e)}>Logout</Button>
                    </div>}
            </Navbar>
        )
    }
}

function mapStateToProps({ users, authedUser }) {

    return {
        user: users[authedUser] ? users[authedUser] : ''
    }
}

export default withRouter(connect(mapStateToProps)(Navigation))