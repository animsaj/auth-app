import React from 'react';
import './Main.css';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Signin from './auth/Signin';
import Signout from './auth/Signout';
import Signup from './auth/Signup';
import SecretPage from './SecretPage';

const Main = () => (
    <main>
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/signin' component={Signin} />
            <Route path='/signout' component={Signout} />
            <Route path='/signup' component={Signup} />
            <Route path='/secretPage' component={SecretPage} />
        </Switch>
    </main>
)

export default Main