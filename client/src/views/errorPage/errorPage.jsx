import React, { Component } from 'react';
import Container from '../../includes/container';
import './errorPage.scss';

export default class ErrorPage extends Component {
    render() {
        const { errCode } = this.props;
        return (
            <Container className="notfound-wrapper text-center" withoutNav container="container">
                <h1 className="section-heading">You weren't supposed to be here.</h1>
                <h2 className="error_num">{errCode && errCode}</h2>
                <div className="uni-cta-wrapper">
                    <a href="/" className="btn btn-primary btn-lg ">Go to home</a>
                </div>
            </Container>
        );
    }
}
