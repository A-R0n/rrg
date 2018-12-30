import React, { Component } from 'react';
import axios from 'axios';
import './Reviews.css';
import RouteIwantToClimb from '../RouteIwantToClimb/RouteIwantToClimb';

// import WorldMap from '../WorldMap/WorldMap';

export default class Journal extends Component {
  constructor() {
    super();

    this.state = {
      myCart: [],
      description: '',
      display: true,
      sent: false
    };
  }
  componentDidMount() {
    this.getRoutes();
  }

  handleClickSend = (id) => {
    axios.put(`/api/iGotIt/${id}`)
    
  }

  getRoutes = () => {
    axios.get('/api/table').then(results => {
      this.setState({
        myCart: results.data
      });
    });
  };

  handleClickDelete = async id => {
    await axios.delete(`/api/table/${id}`);
    await this.getRoutes();
  };

  render() {
    const a_list_of_my_routes = this.state.myCart.map((elem, i) => {
      return (
        <RouteIwantToClimb
          key={i}
          route_img={elem.route_img}
          route_name={elem.route_name}
          route_grade={elem.route_grade}
          picture_of_route={elem.picture_of_route}
          elem={elem}
          display={this.state.display}
          descript={this.state.description}
          handleChange={this.handleChange}
          handleClickPut={this.handleClickPut}
          handleClickDel={this.handleClickDelete}
          handleClickSend={this.handleClickSend}
        />
      );
    });

    return (
      <div>
        <div className='journal'>{a_list_of_my_routes}</div>
        {/* <WorldMap /> */}
      </div>
    );
  }
}
