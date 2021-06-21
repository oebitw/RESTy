import React from 'react';
import ReactJson from 'react-json-view';
import './results.scss';

function Results({ props }) {
  return (
    <section id='results'>
      <ReactJson
        src={props.headers}
        name="Headers"
      />
      
      <ReactJson
        src={props.response}
        name="Response"
      />
    </section>
  );
}

export default Results;