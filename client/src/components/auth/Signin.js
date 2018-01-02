import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import './forms.css';
import * as actions from '../../actions';

const renderField = ({
    input,
    label,
    type }) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={label} type={type} />
            </div>
        </div>
    )
class Signin extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signinUser({ email, password });
    }
    renderError() {
        if (this.props.error) {
            return (
                <div className='error'>
                    <strong>Oups!</strong> {this.props.error}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
                <fieldset>
                    <Field name="email" component={renderField} type="text" label="Email" />
                </fieldset>
                <fieldset>
                    <Field name="password" component={renderField} type="password" label="Password" />
                </fieldset>
                {this.renderError()}
                <button action='submit'>Sign in </button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        error: state.auth.error
    }
}

Signin = connect(mapStateToProps, actions)(Signin);


export default reduxForm({
    form: 'signin'
})(Signin)