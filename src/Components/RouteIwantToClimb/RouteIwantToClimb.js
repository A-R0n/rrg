import React, { Component } from 'react';
import StarRatings from 'react-star-ratings';
import axios from 'axios';

export default class RouteIwantToClimb extends Component{
    constructor(){
        super();

        this.state = {
            rating: 0
        }

        
    }

    changeRating = ( newRating, name) => {
        const {rating} = this.state
        this.setState({rating: newRating});
        console.log('this.props', this.props)
        // console.log('this.state', this.state)
        axios.put(`/api/rating/${this.props.elem.id_of_route}`, {newRating})
    }

        render(){
            console.log(this.state)
            return (
                <div className='everything'>
                    <img className='journalImg' 
                        src={this.props.route_img}
                        alt="text"></img>
                    <p className="routeName">
                    {this.props.route_name} { } {this.props.route_grade}</p>
                    <textarea id='logInput' onChange={(e) => this.props.handleChange(e.target.value)}></textarea>
                    <button id='logButton' onClick={() => this.props.handleClickPut(this.props.elem.route_id)}>Log</button>
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
                        />
                    
                </div>
            )
        }
    }
    

 
// class Foo extends Component {

 
//     render() {
//       // rating = 2;
//       return (

//       );
//     }
// }
