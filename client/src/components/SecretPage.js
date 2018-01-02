import React, { Component } from 'react';
import history from '../history';
import { connect } from 'react-redux';
import * as actions from '../actions';

class SecretPage extends Component {
    fetchMessage() {
        this.props.fetchResponse();
    }
    renderOrRedirect(authenticated) {
        if (authenticated) {
            return (
                [<h2 key='1'>Wellcome to a Super Secret Page</h2>,
                <button key='2' onClick={this.fetchMessage.bind(this)}>Get Secret Message</button>]
            )
        } else {
            history.push('/');
        }
    }
    render() {
        return (
            <div>
                {this.renderOrRedirect(this.props.authenticated)}
                <br />
                <br />
                <div>{this.props.message}</div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        authenticated: state.auth.authenticated,
        message: state.auth.message
    }
}
export default connect(mapStateToProps, actions)(SecretPage)