import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

export default class RouteIwantToClimb extends Component{
    constructor(){
        super();

        this.state = {
            display: true,
            description: ''
        }

        
    }

    changeRating = ( newRating, name) => {
        axios.put(`/api/rating/${this.props.elem.id_of_route}`, {newRating})
    }

    handleClickPut = (id) => {
        axios.put(`/api/description/${id}`, {description: this.state.description}).then(res => {
            this.setState({
                display: false
            })
        })
        axios.put(`/api/timestamp/${id}`)
    }

    handleChange = (e) => {
        this.setState({
            description: e
        })  
    }

        render(){
            return (
                <div className={this.state.display ? 'everything' : 'nothing'}>
                    <img className='journalImg' 
                        src={this.props.route_img}
                        alt="text"></img>
                    <p className="routeName">{this.props.route_name} { } {this.props.route_grade}</p>
                    <textarea id='logInput' onChange={(e) => this.handleChange(e.target.value)}></textarea>
                    <button id='logButton' onClick={() => this.handleClickPut(this.props.elem.route_id)}>Log</button>
                    <button id='sendButton' onClick={() => this.props.handleClickSend(this.props.elem.route_id)}>Send</button>
                    <button id='deleteButton' onClick={() => this.props.handleClickDel(this.props.elem.route_id)}>Delete</button>
                    <StarRatings className='stars'
                        rating={this.state.rating}
                        starRatedColor="yellow"
                        changeRating={this.changeRating}
                        numberOfStars={5}
                        name='rating'
                        starDimension="16px"
                        starSpacing="1px"
                        starEmptyColor="white"
                        starHoverColor="rgb(243, 236, 186)"
                        
                        />
                    
                </div>
            )
        }
    }
    
