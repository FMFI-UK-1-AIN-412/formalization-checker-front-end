import React from 'react';
import { Spinner, Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  selectEvaluation,
  selectEvalStatus,
  selectEvalError
} from '../../redux/solveExerciseSlice';


function Evaluation({ evaluation, status, error }) {
  let content = null;
  if (status === 'loading') {
    content = <Spinner animation="border" variant="primary" />;
  } else if (status === 'succeeded') {
    content = getMessage(evaluation);
  } else if (status === 'failed') {
    content = (
      <Alert variant="danger">
        { error }
      </Alert>
    );
  }

  return content;
}

const mapStateToProps = (state, ownProps) => {
  return {
    evaluation: selectEvaluation(state, ownProps.proposition_id),
    status: selectEvalStatus(state, ownProps.proposition_id),
    error: selectEvalError(state, ownProps.proposition_id)
  };
};

export default connect(mapStateToProps)(Evaluation);


const getMessage = (evaluation) => {
  if (evaluation.solutionToFormalization === 'OK'
      && evaluation.formalizationToSolution === 'OK') {
        return (
          <Alert variant="success">
            <b>Riešenie je správne.</b>
          </Alert>
        );
  } else if (evaluation.solutionToFormalization === 'TE'
      || evaluation.formalizationToSolution === 'TE') {
        return (
          <Alert variant="warning">
            Dokazovaču sa nepodarilo zistiť,
            či je vaše riešenie správne alebo nesprávne.
            <br />Na správnosť vášho riešenia sa spýtajte.
          </Alert>
        );
  } else if (evaluation.solutionToFormalization === 'OK'
      && evaluation.formalizationToSolution === 'WA') {
        return (
          <Alert variant="danger">
            <b>Riešenie je nesprávne.</b>
            <br />Vieme nájsť konkrétnu štruktúru,
            v ktorej je hľadaná správna formalizácia pravdivá,
            ale vaša formalizácia je nepravdivá.
          </Alert>
        );
  } else if (evaluation.solutionToFormalization === 'WA'
      && evaluation.formalizationToSolution === 'OK') {
        return (
          <Alert variant="danger">
            <b>Riešenie je nesprávne.</b>
            <br />Vieme nájsť konkrétnu štruktúru,
            v ktorej je vaša formalizácia pravdivá,
            ale hľadaná správna formalizácia je nepravdivá.
          </Alert>
        );
  } else {
    return (
      <Alert variant="danger">
        <b>Riešenie je nesprávne.</b>
        <br />Vieme nájsť konkrétne štruktúry,
        v ktorých je vaša formalizácia pravdivá,
        ale hľadaná správna formalizácia je nepravdivá, a naopak.
      </Alert>
    );
  }
};
