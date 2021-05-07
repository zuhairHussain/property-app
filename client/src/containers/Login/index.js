import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../../components/Container';
import './login.scss';
import { loginRequest } from '../../store/actions/loginAction';
import { history } from '../../history';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    componentDidMount() {
        const { auth } = this.props;
        if (auth && auth.userData) {
            history.push('/');
        }
    }
    render() {
        const { email, password } = this.state;
        let login = () => {
            this.props.login({email, password});
        }
        return (
            <Container className="login-wrapper" withoutNav container="container" hideLogout>
                <h2 className="mb-4">Login</h2>
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
                    </div>
                    <div className="text-center mt-4">
                        <button type="button" className="btn btn-primary" onClick={() => login()}>Submit</button>
                    </div>
                </form>
            </Container>
        );
    }
}

function mapState(state) {
    const { loginReducer } = state;
    return { auth: loginReducer };
}

const actionCreators = {
    login: loginRequest
};

export default connect(mapState, actionCreators)(Login);