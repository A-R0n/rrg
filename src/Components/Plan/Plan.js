import React, { Component } from 'react';
import axios from 'axios';
import './Plan.css';

export default class Plan extends Component {
    constructor(){
        super();

        this.state = {
            empt: [],
            routesIwantToClimb: [],
            filterString: ""
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        axios.get('/api/routes').then(results => {
          this.setState({
            empt: results.data
          })
        })
      }

    handleClick(id){
        console.log(id);
        axios.post(`/api/test/${id}`).then(results => {
            this.setState({
                routesIwantToClimb: results.data
            })
        })
    }

    handleChange(filter) {
        this.setState({
            filterString: filter
        })
    }


    render(){

        let routesToDisplay = this.state.empt.filter((elem, index) => {
            return elem.crag.includes(this.state.filterString)
            
        }).map((elem, index) => {
            return <div className="routeDisplay" key={index}>
            <div className='container'>
                <img id="routeImg" src={elem.route_img} alt='text'></img>
                <div id="text">
                    <p>Route: {elem.route_name}</p>
                    <p>Grade: {elem.route_grade}</p>
                    <p id="sportOrtrad">Type: {elem.route_type}</p>
                    <p>Crag: {elem.crag}</p>
                </div>
            </div> 
            <button className='Add' onClick={() => this.handleClick(elem.route_id)}>+</button>
        </div>
        })

        // if(this.state.filterString){
        //     return {{margin-bottom: 70vh;}
        // }

        return (
            <div className='everythingPlan'>
            <input id="findCrag" onChange={(e) => this.handleChange(e.target.value)} type="text"  placeholder="Find Crag"/>
            {routesToDisplay}
            </div>
        )
    }
}