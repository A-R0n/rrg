import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import './Routes.css';

class Routes extends Component {
  constructor() {
    super();

    this.state = {
        routes: [],
        amountOfReviews: [],
        average: '',
        arrToBeAveraged: '',
        
    };

  }

  componentDidMount(){
   axios.get('/api/everyone').then(results => {
        this.setState({
            routes: results.data,
        }, () => {
            const ratings = this.state.routes.filter(elem => elem.route_name === this.props.match.params.route_name)
            const total = ratings.map((e, i)=> {
                return e.rating
            }).reduce((a, b) => a + b, 0)
            this.setState({
                arrToBeAveraged: ratings.length,
                average: total / ratings.length
            })
        })
    })
}


  render() {
    const { average, routes, arrToBeAveraged } = this.state;

    let route = routes && routes.filter(elem => elem.route_name === this.props.match.params.route_name)
    .map((elem, index) => {
        
        return (
            <div className='routeReviews'key={index}>
                <div className='nameAndGrade'>
                    <h2 id='routeReviewName'>{elem.route_name}</h2>
                    <p>{elem.route_grade}</p>     
                </div>
                <p id='routeReviewType'>({elem.route_type})</p>
                <p id='routeReviewDescription'>{elem.description_}</p>
                <p id='author'></p>
                <p id='routeReviewRating'>Stars: {elem.rating}</p>
                <p id='routeReviewSent'>{elem.sent_}</p>
                <p id='routeReviewTimeStamp'>{moment(elem.time_stamp).calendar()}</p>
            </div>
        )
    })

    return (
      <div className='III'>
        <div className='topPortion'>
            <div>amount of reviews: {arrToBeAveraged}</div>
            <div>average stars: {average}</div>
        </div>
        {route}
      </div>
    );
  }
}

export default Routes;