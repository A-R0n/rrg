import React, { Component } from 'react';
import axios from 'axios';
import './Reviews.css';
import RouteIwantToClimb from '../RouteIwantToClimb/RouteIwantToClimb';

export default class Journal extends Component {
    constructor(){
        super();

        this.state = {
            secondCart: [],
            description: '',
            display: true,
            sent: false
            
        }
        
        
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

      handleClickSend(id){
        axios.put(`/api/iGotIt/${id}`).then(res => {
            this.setState({
                sent: !this.state.sent
            })
        })
        
    }

      handleClickDelete(e){
        axios.delete(`/api/table/${e}`).then()
        axios.get('/api/table').then(results => {
            this.setState({
                secondCart: results.data,
            })
        })
    }

    render(){

        var thirdMap = this.state.secondCart.map((elem, i) => {
            return <RouteIwantToClimb key={i} route_img = {elem.route_img}
            route_name = {elem.route_name} route_grade = {elem.route_grade} elem={elem} display = {this.state.display}
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