import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';
import './badges.scss';

export default function Badges(props) {
  const { files } = props;

  return (
    <>
      {
        files.map((d, i) => {
          return (
            <Badge key={i} className="mr-1" pill variant="info">{d}</Badge>
          );
        })
      }
    </>
  );
}

Badges.propTypes = {
  files: PropTypes.array.isRequired
};