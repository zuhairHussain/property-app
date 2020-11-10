import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Nav extends Component {
    state = {}
    render() {
        const { navOpen } = this.props;
        return (
            <nav className={navOpen + " side-nav"}>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <NavLink exact to='/' className="nav-link" activeClassName="active">
                            <i className="icon home" /> Home
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to='/billing' className="nav-link" activeClassName="active">
                            <i className="icon acc-bill"></i> Account &amp; Billing
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#"><i className="icon acc"></i> Account Details</a>
                    </li>
                </ul>
            </nav>
        );
    }
}

export default Nav;