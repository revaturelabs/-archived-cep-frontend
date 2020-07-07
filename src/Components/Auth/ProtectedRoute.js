import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//Test Make sure to change the variables to back the intended variables
const loggedInT = 't'
const roleT = 'CLIENT'

//This prevents the redirection to a certain page if you're not logged in
//In addition to checking whether or not your admin or client preventing redirection to pages of the other's 
export const AdminProtectedRoute = ({component: Component, ...rest}) => {

    //Get login status and role from redux storage
    const loggedIn = useSelector(state => state.token)
    const role = useSelector(state => state.role)

    //Return a route
    return (
        <Route {...rest} render={props => {
            //If there is a JWT then the user is atleast logged in
            if (loggedInT) {
                //checks if the user is a admin and allows them to continue to the webpage else redirect them to a 403 page
                if(roleT === 'ADMIN')
                    return <Component {...props} />;
                else 
                    return (<Redirect to={{pathname: '/403', state: { from: props.location }}} />);
            }
            //else then redirect the user to homepage since not logged in
            else {
                return (<Redirect to={{pathname: '/', state: { from: props.location }}} />);
            }
        }}
        />
    );
};

//Same as the code above but protects the client routes
export const ClientProtectedRoute = ({component: Component, ...rest}) => {
    
    //Get login status and role from redux storage
    const loggedIn = useSelector(state => state.token)
    const role = useSelector(state => state.role)

    //Return a route
    return (
        <Route {...rest} render={props => {
            //checks if the user is a client and allows them to continue to the webpage else redirect them to a 403 page
            if (loggedInT) {
                if(roleT === 'CLIENT')
                    return <Component {...props} />;
                else 
                    return (<Redirect to={{pathname: '/403', state: { from: props.location }}} />);
            }
            //else then redirect the user to homepage since not logged in
            else {
                return (<Redirect to={{pathname: '/', state: { from: props.location }}} />);
            }
        }}
        />
    );
};
