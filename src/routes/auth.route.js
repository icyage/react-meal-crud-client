import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = ({ component: Component, ...rest }) => {
    const { user, token } = useSelector(state => state.auth);
    const isLoggedIn = !(!token || token === '' || !user);

    return (
        <Route
            {...rest}
            render={props => {
                if (!isLoggedIn) {
                    return <Component {...props} />;
                }
                return <Redirect to='/' />;
            }}
        />
    );
};

AuthRoute.propTypes = {
    component: PropTypes.func.isRequired
};

export default AuthRoute;