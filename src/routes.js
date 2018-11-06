import React from 'react';
import Plan from './Components/Plan/Plan';
import Home from './Components/Home/Home';
import Journal from './Components/Journal/Journal';
import Profile from './Components/Profile/Profile';
import {Route, Switch} from 'react-router-dom';




export default (

    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/plan" component={Plan} />
        <Route path="/journal" component={Journal} />
        <Route path="/profile" component={Profile} />
        <Route path="*" render={() => <h1>404 not Found!</h1>} />
    </Switch>
);