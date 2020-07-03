import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from "./auth";

export const ProtectedRoute = ({component: Component, ...rest}) => {
    //Return a route
    return (
        <Route {...rest} render={props => {
            //If the user is authenticated then proceed to the desired page
            if (auth.isAuthenticated()) {
                return <Component {...props} />;
            }
            //else then redirect the user to the home
            else {
                return (<Redirect to={{pathname: "/", state: { from: props.location }}} />);
            }
        }}
        />
    );
};
