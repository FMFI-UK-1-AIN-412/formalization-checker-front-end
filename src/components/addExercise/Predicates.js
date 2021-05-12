import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import SyntaxError from './SyntaxError';
import {
  updatePredicates,
  selectPredicatesParsed
} from '../../redux/addExerciseSlice';


function Predicates({ value, error, update }) {
  return (
    <Form.Group>
      <Form.Label>
        Predicates:
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter predicates"
        value={value}
        onChange={(e) => update(e.target.value)}
      />
      <SyntaxError value={value} error={error} />
    </Form.Group>
  );
}

const mapStateToProps = selectPredicatesParsed;

const mapDispatchToProps = { update: updatePredicates };

export default connect(mapStateToProps, mapDispatchToProps)(Predicates);
