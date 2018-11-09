import React, { Component } from 'react';
import Header from './Components/Header/Header';
import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import routes from './routes';

class App extends Component {
  constructor() {
    super();

    this.state = {
      corrd: []
    }
    
  }


  render() {
   
    let mapper = this.state.corrd.map((val) => {
      return <div key={val.id}>
      <p>{val.main}</p>
      </div>
    })
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header title="Red River Gorge"  profile="Profile" plan="Search" journal='Reviews' />
            {routes}
            <div>{mapper}</div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
