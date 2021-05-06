import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import SearchBar from '../../components/SearchBar';
import List from '../../components/List';
import './home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <Container className="home-page">
                <SearchBar/>
                <List/>
            </Container>
        );
    }
}
export default Home;