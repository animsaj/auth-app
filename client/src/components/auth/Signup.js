import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import './forms.css';
import * as actions from '../../actions';

const validate = values => {
    const errors = {};
    if (!values.email) {
        errors.email = 'Required'
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (values.password !== values.passwordConfirm) {
        errors.password = 'Passwords do not match'
    }
    return errors;
}

const renderField = ({
    input,
    label,
    type,
    meta: { touched, error, warning }
}) => (
        <div>
            <label>{label}</label>
            <div>
                <input {...input} placeholder={label} type={type} />
                {touched && error && <span className='small-error'>{error}</span>}
            </div>
        </div>
    )

class Signup extends Component {
    handleFormSubmit({ email, password }) {
        this.props.signupUser({ email, password });
    }
    renderError() {
        if (this.props.serverError) {
            return (
                <div className='error'>
                    <strong>Oups!</strong> {this.props.error}
                </div>
            )
        }
    }

    render() {
        const { handleSubmit, submitting } = this.props;
        return (
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))} >
                <fieldset>
                    <Field name="email" type="email" component={renderField} label="Email" />
                </fieldset>
                <fieldset>
                    <Field name="password" component={renderField} type="password" label="Password" />
                </fieldset>
                <fieldset>
                    <Field name="passwordConfirm" component={renderField} type="password" label="Confirm Password" />
                </fieldset>
                {this.renderError()}
                <button action='submit' disabled={submitting}>Sign up</button>
            </form>
        )
    }
}

function mapStateToProps(state) {
    return {
        serverError: state.auth.error
    }
}

Signup = connect(mapStateToProps, actions)(Signup);


export default reduxForm({
    form: 'signup',
    validate
})(Signup)