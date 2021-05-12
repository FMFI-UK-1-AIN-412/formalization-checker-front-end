import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import SyntaxError from './SyntaxError';
import {
  removeFormalization,
  updateFormalization,
  selectFormalization
} from '../../redux/addExerciseSlice';


function Formalization({ i, j, value, error, remove, update }) {
  return (
    <div className="clearfix pl-5">
      <Form.Group className="mb-0">
        <Form.Label>
          {"Formalization " + (i + 1) + "." + (j + 1)}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter formalization"
          value={value}
          onChange={(e) => update(e.target.value, i, j)}
        />
        <Button
          className="mt-1 float-right"
          variant="outline-danger"
          size="sm"
          onClick={() => remove(i, j)}
        >
          Remove
        </Button>
        <SyntaxError value={value} error={error} />
      </Form.Group>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  const data = selectFormalization(state, ownProps.i, ownProps.j);
  return {
    value: data.value,
    error: data.error
  };
};

const mapDispatchToProps = {
  remove: removeFormalization,
  update: updateFormalization
};

export default connect(mapStateToProps, mapDispatchToProps)(Formalization);
