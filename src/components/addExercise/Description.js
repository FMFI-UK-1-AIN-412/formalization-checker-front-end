import React from 'react';
import { Form } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  updateDescription,
  selectDescription
} from '../../redux/addExerciseSlice';


function Description({ value, update }) {  
  return (
    <Form.Group>
      <Form.Label>
        Description:
      </Form.Label>
      <Form.Control
        type="text"
        placeholder="Enter description"
        value={value}
        onChange={(e) => update(e.target.value)}
      />
    </Form.Group>
  );
}

const mapStateToProps = selectDescription;

const mapDispatchToProps = { update: updateDescription };

export default connect(mapStateToProps, mapDispatchToProps)(Description);
