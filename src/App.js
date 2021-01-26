import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import 'react-notifications/lib/notifications.css';

import { SignInPage, SignUpPage, MealsPage, UsersPage, SettingsPage } from './pages';
import { AuthRoute, MainRoute } from './routes';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <AuthRoute path="/login" component={SignInPage} />
                <AuthRoute path="/register" component={SignUpPage} />

                <MainRoute exact path="/" component={MealsPage} auth={['Admin', 'Regular']} />
                <MainRoute path="/users" component={UsersPage} auth={['Admin', 'Manager']} />
                <MainRoute path="/settings" component={SettingsPage} auth={['Admin', 'Regular']} />
            </Switch>
            <NotificationContainer />
        </BrowserRouter>
    );
};

export default App;