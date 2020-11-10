import React, { Component } from 'react';
import Header from '../includes/header';
import Footer from '../includes/footer';
import Nav from '../includes/nav';

export default class Container extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isNavOpen: false
        };
    }

    toggleNav() {
        this.setState({ isNavOpen: !this.state.isNavOpen });
    }

    render() {
        const { className, container, children, noHeader, noFooter, withoutNav } = this.props;
        return (
            <React.Fragment>
                {
                    !noHeader ? (<Header toggleNav={() => this.toggleNav()} withoutNav={withoutNav ? withoutNav : ""} />) : ""
                }
                <div className={withoutNav ? 'main-cnt clearfix' : 'main-cnt sidebar-nav-main clearfix'}>
                    {
                        !withoutNav ? (<Nav navOpen={this.state.isNavOpen ? 'open' : ''} />) : ""
                    }
                    <div className={`${className ? "main " + className : "main"} ${!withoutNav ? " hasNavbar" : ""}`}>
                        <div className={container ? container : "custom-container"}>
                            {children}
                        </div>
                    </div>
                </div>
                {
                    !noFooter ? (<Footer />) : ""
                }

            </React.Fragment>
        );

    }
}