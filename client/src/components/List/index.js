import React, { Suspense } from 'react';
import { Card, CardColumns, Alert } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './list.scss';
import { removeDuplicatesFromArray } from "../../utils"
const Badges = React.lazy(() => import('../Badges'));
const ForkList = React.lazy(() => import('../Fork'));

function RenderList(users){
  let list = users.data.map((d, i) => {
    const { description, files, id } = d;

    let fileTypes = [];
    Object.keys(files).forEach(function(k){
      fileTypes.push(files[k].language);
    });

    return (
      <Card key={i}>
        <Card.Body>
          <Card.Title>{description ? description : 'No Description'}</Card.Title>
          <Suspense fallback={<div>Loading...</div>}>
            <Badges files={removeDuplicatesFromArray(fileTypes)}/>
            <ForkList id={id}/>
          </Suspense>
        </Card.Body>
      </Card>
    );
  });

  return list;
}

export default function List(props) {
  const userList = useSelector(state => state.gistReducer);
  const { error, gistList } = userList;
  return (
    <div className="users-list">
      {error && <Alert variant="danger">{error}</Alert>}
      <CardColumns>
        <RenderList data={gistList}/>
      </CardColumns>
    </div>
  );
}