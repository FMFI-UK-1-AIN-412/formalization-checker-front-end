import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';


function ProtectedRoute({ isLoggedIn, component: Component, location, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        if (isLoggedIn) {
          return <Component />;
        } else {
          return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
        }
      }}
    />
  );
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(ProtectedRoute);
