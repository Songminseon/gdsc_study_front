import React from "react";
import { Route, Redirect } from "react-router-dom";

function LoginRoute({ authenticated, component: Component, render, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        !authenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
}

export default LoginRoute;
