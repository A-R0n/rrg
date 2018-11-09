import React from 'react';
import Plan from './Components/Plan/Search';
import Home from './Components/Home/Home';
import Journal from './Components/Journal/Reviews';
import Profile from './Components/Profile/Profile';
import {Route, Switch} from 'react-router-dom';
import Routes from './Components/Routes/Routes';




export default (

    <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/plan" component={Plan} />
        <Route path="/journal" component={Journal} />
        <Route path='/routes/:route_name' component={Routes} />
        <Route path="/profile" component={Profile} />
        <Route path="*" render={() => <h1>404 not Found!</h1>} />
    </Switch>
);