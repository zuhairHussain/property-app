import React, { useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { Image, Col, Row } from 'react-bootstrap';
import Services from "../../services";
import './fork.scss';


export default function ForkList(props) {
  const { id } = props;
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState([]);
  
  useEffect(() => {
    Services.fetchForkList(id)
    .then(data => {
        if (data.length) {
          data.length = Math.min(data.length, 3);
          setState(data)
          setEnabled(true)
        }
    }).catch(error => {
        console.log(error)
    });
  }, [enabled, id]);

  return (
    <Row className="fork-list mt-4" noGutters>
      {
        state.map((d, i) => {
              const {owner} = d;
              return (<Col className="thumb-col" xs={2} key={i}>
                  <a href={owner.html_url}>
                      <Image src={owner.avatar_url} roundedCircle fluid title={owner.login}/>
                  </a>
              </Col>);
          })
      }
    </Row>
  );
}

ForkList.propTypes = {
  id: PropTypes.string.isRequired
};