import React, { Component } from 'react';
import axios from 'axios';
import './Journal.css';
import RouteIwantToClimb from '../RouteIwantToClimb/RouteIwantToClimb.js';

export default class Journal extends Component {
    constructor(){
        super();

        this.state = {
            secondCart: [],
            description: '',
            nothing: true,
            sent: false
            
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleClickPut = this.handleClickPut.bind(this);
        this.handleClickDelete = this.handleClickDelete.bind(this);
        this.handleClickSend = this.handleClickSend.bind(this);
    }


      componentDidMount(){
          axios.get('/api/table').then(results => {
              this.setState({
                  secondCart: results.data,
              })
          })
      }

      handleChange(e){
          this.setState({
              description: e
          })  
      }

      handleClickPut(id){
          console.log(id)
          axios.put(`/api/description/${id}`, {description: this.state.description}).then(res => {
              this.setState({
                  nothing: !this.state.nothing
              })
          })
          axios.put(`/api/timestamp/${id}`)
      }

      handleClickSend(id){
        console.log(id)
        axios.put(`/api/description/${id}`).then(res => {
            this.setState({
                sent: !this.state.sent
            })
        })
        
    }

      

      handleClickDelete(e){
        console.log(e)
        axios.delete(`/api/table/${e}`).then()
        axios.get('/api/table').then(results => {
            this.setState({
                secondCart: results.data,
            })
        })
    }

    // changeRating = ( newRating, name, elem ) => {
    //     const {rating} = this.state
    //     this.setState({rating: newRating});
    //     console.log('the state after the star is clicked', this.state)
    //     console.log('x', elem)
    //     axios.put(`/api/rating/${elem}`, {rating})
    // }
    
   


    render(){

        var thirdMap = this.state.secondCart.map((elem, i) => {
            return <RouteIwantToClimb key={i} route_img = {elem.route_img}
            route_name = {elem.route_name} route_grade = {elem.route_grade} elem={elem}
            descript={this.state.description} 
            handleChange = {this.handleChange}
            handleClickPut = {this.handleClickPut}
            handleClickDel = {this.handleClickDelete}
            handleClickSend = {this.handleClickSend}/>      
        })

        
        return (
            <div className='journal'>{thirdMap}</div>
        )
    }
}