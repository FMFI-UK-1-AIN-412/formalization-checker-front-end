import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import SyntaxError from './SyntaxError';
import {
  updateConstants,
  selectConstantsParsed
} from '../../redux/addExerciseSlice';


function Constants({ value, error, update }) {  
  return (
    <Form.Group>
      <Form.Label>
        Constants:
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter constants"
        value={value}
        onChange={(e) => update(e.target.value)}
      />
      <SyntaxError value={value} error={error} />
    </Form.Group>
  );
}

const mapStateToProps = selectConstantsParsed;

const mapDispatchToProps = { update: updateConstants };

export default connect(mapStateToProps, mapDispatchToProps)(Constants);
