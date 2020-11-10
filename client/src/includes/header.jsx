import React, { Component } from 'react';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        const { withoutNav } = this.props;
        return (
            <header className="header">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid header-fluid">
                        {
                            !withoutNav && (
                                <button onClick={() => this.props.toggleNav()} className="navbar-toggler" type="button">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            )
                        }
                        <a className="navbar-brand mr-auto" href="/">
                            <img src={require('../assets/images/logo.png')} className="img-fluid" alt="logo" />
                        </a>
                        <div className="btn-group user-info">
                            <span className="user-acc-ico" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img className="img-fluid" src={require("../assets/images/user-icon.png")} alt="user" />
                            </span>
                            <div className="dropdown-menu dropdown-menu-right">
                                <div className="user-details">
                                    <span className="username">test</span>
                                    <span className="user-email">test@test.com</span>
                                </div>
                                <div className="dropdown-divider"></div>
                                <button className="dropdown-item" type="button">My Account</button>
                                <button className="dropdown-item" type="button">Sign Out</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header >
        );
    }
}

export default Header;