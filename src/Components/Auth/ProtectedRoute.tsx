import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

//This prevents the redirection to a certain page if you're not logged in
//In addition to checking whether or not your admin or client preventing redirection to pages of the other's

//{component: Component, ...rest}
export const AdminProtectedRoute = (component: any, ...rest: any ) => {

    const {Component} = component;

    //Get login status and role from redux storage
    const loggedIn = useSelector((state: any) => state.credReducer.isLoggedIn)
    const role = useSelector((state: any) => state.credReducer.role)

    //Return a route
    return (
        <Route {...rest} render={props => {
            //If there is a JWT then the user is atleast logged in
            if (loggedIn) {
                //checks if the user is a admin and allows them to continue to the webpage else redirect them to a 403 page
                if(role === 'ADMIN')
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
export const ClientProtectedRoute = (component: any, ...rest: any ) => {

    const {Component} = component;
    
    //Get login status and role from redux storage
    const loggedIn = useSelector((state: any) => state.credReducer.isLoggedIn)
    const role = useSelector((state: any) => state.credReducer.role)

    //Return a route
    return (
        <Route {...rest} render={props => {
            //checks if the user is a client and allows them to continue to the webpage else redirect them to a 403 page
            if (loggedIn) {
                if(role === 'CLIENT')
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
