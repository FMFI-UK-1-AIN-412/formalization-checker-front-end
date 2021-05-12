import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import SyntaxError from './SyntaxError';
import {
  updateFunctions,
  selectFunctionsParsed
} from '../../redux/addExerciseSlice';


function Functions({ value, error, update }) {
  return (
    <Form.Group>
      <Form.Label>
        Functions:
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter functions"
        value={value}
        onChange={(e) => update(e.target.value)}
      />
      <SyntaxError value={value} error={error} />
    </Form.Group>
  );
}

const mapStateToProps = selectFunctionsParsed;

const mapDispatchToProps = { update: updateFunctions };

export default connect(mapStateToProps, mapDispatchToProps)(Functions);
