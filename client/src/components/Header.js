import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Header.css';
import * as actions from '../actions';

class Header extends Component {
    signOut() {
        this.props.signoutUser();
    }
    renderLinks() {
        if (this.props.authenticated) {
            return <li onClick={this.signOut.bind(this)}><Link to='/signout'>Sign Out</Link></li>
        } else {
            return (
                [<li key='1'><Link to='/signin'>Sign In</Link></li>,
                <li key='2'><Link to='/signup'>Sign Up</Link></li>]
            )
        }
    }
    render() {
        return (
            <nav>
                <Link to='/'>Redux-authentication-App</Link>
                <ul>
                    {this.renderLinks()}
                </ul>
            </nav>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated
    }
}

export default connect(mapStateToProps, actions)(Header)