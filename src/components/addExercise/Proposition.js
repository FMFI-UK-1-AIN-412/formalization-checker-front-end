import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import Formalization from './Formalization';
import {
  addNewFormalization,
  removeProposition,
  updateInformalValue,
  selectInformalValue,
  selectFormalizations
} from '../../redux/addExerciseSlice';


function Proposition({ i, value, formalizations, add, remove, update }) {
  const formalizations_list = formalizations.map((x, j) => (
    <Formalization key={j} i={i} j={j} />
  ));

  return (
    <div className="clearfix mb-2 border-bottom border-dark">
      <Form.Group className="clearfix mb-0">
        <Form.Label>
          {"Proposition " + (i + 1)}
        </Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter proposition"
          value={value}
          onChange={(e) => update(e.target.value, i)}
        />
        <Button
          className="mt-1 mb-1 float-right"
          variant="outline-danger"
          size="sm"
          onClick={() => remove(i)}
        >
          Remove proposition
        </Button>
        { value === "" ?
          <Form.Text className="mb-3 text-danger">
            This field cannot be empty
          </Form.Text>
          : null
        }
      </Form.Group>
      { formalizations_list }
      <Button
        className="mt-1 mb-3 float-right"
        variant="primary"
        size="sm"
        onClick={() => add(i)}
      >
        Add formalization
      </Button>
    </div>
  );
}

const mapStateToProps = (state, ownProps) => {
  return {
    value: selectInformalValue(state, ownProps.i),
    formalizations: selectFormalizations(state, ownProps.i)
  };
};

const mapDispatchToProps = {
  add: addNewFormalization,
  remove: removeProposition,
  update: updateInformalValue
};

export default connect(mapStateToProps, mapDispatchToProps)(Proposition);
