import React from 'react';
import { connect } from 'react-redux';
import {
  selectLanguage
} from '../../redux/addExerciseSlice';


function Clashes({ errorMessage }) {
  return errorMessage ? (
    <p className="text-danger">
      {errorMessage}
    </p>
  )
  : null;
}

const mapStateToProps = (state) => {
  return {
    errorMessage: selectLanguage(state).errorMessage
  };
};

export default connect(mapStateToProps)(Clashes);
