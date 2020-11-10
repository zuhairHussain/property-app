import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions/actions';
import Container from '../../includes/container';
import Alert from '../../components/alerts/alerts';
import './login.scss';
import { Validator, ErrorMessages, isAllValid } from '../../services/validator';
import Service from '../../services/services';

class Login extends Component {
    constructor(props) {
        super(props);
        this.service = new Service();
        this.validator = new Validator();
        this.state = {
            email: "",
            password: ""
        }
    }
    login() {
        const { email, password } = this.state
        let emailValid = this.validator.valid("email", email, true);
        let passValid = this.validator.valid("text", password, true);

        this.setState(emailValid.error ? { emailError: emailValid.message } : { emailError: '' })
        this.setState(passValid.error ? { passwordError: passValid.message } : { passwordError: '' })

        let isValid = isAllValid([emailValid.error, passValid.error]);

        if (isValid) {
            this.props.login({ email: email, password: password });
        }
    }
    errorMessages(error) {
        return (
            <p className={error ? 'error' : 'd-none'}> {error ? error : ""}</p>
        );
    }
    render() {
        const { auth } = this.props;
        const { email, password, emailError, passwordError } = this.state;
        return (
            <Container className="login-wrapper" withoutNav container="container">
                <Alert type="danger" show={auth && auth.loginErrorMessage} text={auth.loginErrorMessage} />
                <h2 className="text-center mb-4">Login</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address:</label>
                        <input
                            type="email"
                            className="form-control"
                            placeholder="Enter email"
                            id="email"
                            value={email}
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                        <ErrorMessages error={emailError} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="pwd">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            id="pwd"
                            value={password}
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                        <ErrorMessages error={passwordError} />
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="btn btn-primary" onClick={() => this.login()}>Submit</button>
                        <a href="/forgotpassword" className="forgot-password mt-4 d-block">Forgot Your Password?</a>
                        <p className="mt-4">Don't have an account? <a href="https://www.purevpn.com/order" target="_blank">Sign Up</a></p>
                    </div>
                </form>
            </Container>
        );
    }
}

function mapState(state) {
    const { authReducer } = state;
    return { auth: authReducer };
}

const actionCreators = {
    login: loginRequest
};

export default connect(mapState, actionCreators)(Login);