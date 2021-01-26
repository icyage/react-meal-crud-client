import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const defaultRoutes = {
    Regular: '/',
    Manager: '/users',
    Admin: '/',
};

const MainRoute = ({ component: Component, auth, ...rest }) => {
    const { user, token } = useSelector(state => state.auth);
    const isLoggedIn = !(!token || token === '' || !user);

    return (
        <Route
            {...rest}
            render={props => {
                if (isLoggedIn) {   
                    if (auth.includes(user.role)) {
                        return <Component {...props} />;
                    }
                    return <Redirect to={defaultRoutes[[user.role]]} />;
                }
                return <Redirect to='/login' />;
            }}
        />
    );
};

MainRoute.propTypes = {
    component: PropTypes.func.isRequired,
    auth: PropTypes.array.isRequired,
};

export default MainRoute;