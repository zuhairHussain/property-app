import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { gistRequest } from '../../store/actions/gistAction';
import './searchBar.scss';

export default function SearchBar(props) {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  let search = () => {
    dispatch(gistRequest(searchText));
  }
  
  return (
    <div className="search-bar">
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Search for a username"
            aria-label="Search for a username"
            size="lg"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <InputGroup.Append>
            <Button variant="primary" onClick={() => search()}>Search</Button>
          </InputGroup.Append>
        </InputGroup>
    </div>
  );
}