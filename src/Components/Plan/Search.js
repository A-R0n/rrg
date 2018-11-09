import React, { Component } from 'react';
import axios from 'axios';
import './Search.css';
import {Link} from 'react-router-dom';

export default class Search extends Component {
    constructor(){
        super();

        this.state = {
            allTheRoutes: [],
            routesIwantToClimb: [],
            inputString: "",
            isSelected: false
        }
    }

    componentDidMount(){
        axios.get('/api/routes').then(results => {
          this.setState({
            allTheRoutes: results.data
          })
        })
      }

    handleClick = (id) => {
        axios.post(`/api/test/${id}`).then(results => {
            this.setState({
                routesIwantToClimb: results.data,
                isSelected: !this.state.isSelected
            })
        })
    }

    handleChange = (filter) => {
        this.setState({
            inputString: filter
        })
    }


    render(){

        // let cragToDisplay = this.state.empt.filter((elem, index) => {
        //     return elem.crag.includes(this.state.filterString)
            
        // }).map((elem, index) => {
        //     return <div className="routeDisplay" key={index}>
        //     <div className='container'>
        //         <img id="routeImg" src={elem.route_img} alt='text'></img>
        //         <div id="text">
        //             <p>Route: {elem.route_name}</p>
        //             <p>Grade: {elem.route_grade}</p>
        //             <p id={elem.route_type === 'sport' ? 'sport' : 'trad'}>Type: {elem.route_type}</p>
        //             <p>Crag: {elem.crag}</p>
        //             <p id='rating'>Rating: {elem.MP_rating}</p>
        //         </div>
        //     </div> 
        //     <button className='Add' onClick={() => this.handleClick(elem.route_id)}>+</button>
        // </div>
        // })

        let routeToDisplay = this.state.allTheRoutes.filter((elem, index) => {
            return elem.route_name.includes(this.state.inputString)
            
        }).map((elem, index) => {
            return (
            
            <div key={index} className="routeDisplay">
                <div className='container'>
                    <img id="routeImg" src={elem.route_img} alt='text'></img>
                    <div id="text">
                        <Link key={index} to={`/routes/${elem.route_name}`}>
                            <p>Route: {elem.route_name}</p>
                        </Link>
                        <p>Grade: {elem.route_grade}</p>
                        <p id={elem.route_type === 'sport' ? 'sport' : 'trad'}>Type: {elem.route_type}</p>
                        <p>Crag: {elem.crag}</p>
                        <p id='rating'>Rating: {elem.MP_rating}</p>
                    </div>
                </div> 
                <button className={this.state.isSelected === true ? 'Add' : 'dontAdd'}onClick={() => this.handleClick(elem.route_id)}>+</button>
            </div>
            )
            
        })

        // let gradeToDisplay = this.state.allTheRoutes.filter((elem, index) => {
        //     return elem.route_grade.includes(this.state.inputString)
            
        // }).map((elem, index) => {
           
        //     return <div className="routeDisplay" key={index}>
        //     <div className='container'>
        //         <img id="routeImg" src={elem.route_img} alt='text'></img>
        //         <div id="text">
        //             <p>Route: {elem.route_name}</p>
        //             <p>Grade: {elem.route_grade}</p>
        //             <p id={elem.route_type === 'sport' ? 'sport' : 'trad'}>Type: {elem.route_type}</p>
        //             <p>Crag: {elem.crag}</p>
        //             <p id='rating'>Rating: {elem.MP_rating}</p>
        //         </div>
        //     </div> 
        //     <button className='Add' onClick={() => this.handleClick(elem.route_id)}>+</button>
        // </div>
        // })

        // let typeToDisplay = this.state.allTheRoutes.filter((elem, index) => {
        //     return elem.route_type.includes(this.state.inputString)
            
        // }).map((elem, index) => {
            
        //     return <div className="routeDisplay" key={index}>
        //     <div className='container'>
        //         <img id="routeImg" src={elem.route_img} alt='text'></img>
        //         <div id="text">
        //             <p>Route: {elem.route_name}</p>
        //             <p>Grade: {elem.route_grade}</p>
        //             <p id={elem.route_type === 'sport' ? 'sport' : 'trad'}>Type: {elem.route_type}</p>
        //             <p>Crag: {elem.crag}</p>
        //             <p id='rating'>Rating: {elem.MP_rating}</p>
        //         </div>
        //     </div> 
        //     <button className='Add' onClick={() => this.handleClick(elem.route_id)}>+</button>
        // </div>
        // })

        

        return (
            <div className='everythingPlan'>
            
            <input id="find_route" onChange={(e) => this.handleChange(e.target.value)} type="text"  placeholder="Search Route"/>
            
            {routeToDisplay}

            {/* <input id="find_grade" onChange={(e) => this.handleChange(e.target.value)} type="text"  placeholder="Search Grade"/>
            
            {gradeToDisplay}

            <input id="find_type" onChange={(e) => this.handleChange(e.target.value)} type="text"  placeholder="Search Type"/>
            
            {typeToDisplay}
            
            
            <input id="find_crag" onChange={(e) => this.handleChange(e.target.value)} type="text"  placeholder="Search Crag"/>
            
            {cragToDisplay} */}
            
            </div>
        )
    }
}