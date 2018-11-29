import React, { Component } from 'react';
import './Header.css';
import {Link} from 'react-router-dom';
// import {connect} from 'react-redux';
// import { viewCart } from '../../redux/reducer';
import axios from 'axios';

export default class Header extends Component {
    constructor(){
        super();

        this.state = {
            clientName: [],
            number: ''
        }
    }
    componentDidMount(){
        axios.get('/api/user').then(res => {
            res.data.pasport &&
         this.setState({
                clientName: res.data.passport.user.username
            })
        })
    }

    seeCart = incomingObject => {
    
        this.props
          .viewCart(incomingObject)
          .then(
            this.setState({
              number: Object.assign({}, this.state.number, { image_url: incomingObject })
            })
          );
      };
    render(){
        // console.log('props',this.props);
        // console.log('state', this.state);
    return (
        <div className="header">
            <h1 id="head">{this.props.title}</h1>
            {this.state.clientName.length !== 0 &&
            <p> Hi {this.state.clientName}</p>}
            <div className='rightSideOfHeader'>

        <Link to ='/'><p className='homebutton'>Home</p></Link>
        <Link to = '/plan'><p className='searchbutton'>{this.props.plan}</p></Link>
        <Link to ='/journal'><p className='journalbutton'>{this.props.journal}</p></Link>
        {/* <div>{this.state.number.length}</div> */}
        <Link to ='/profile'><p className='profilebutton'>{this.props.profile}</p></Link>
            </div>
    </div>
        );
    }
}

// const mapStateToProps = state => state;
// export default connect(
//   mapStateToProps,
//   { viewCart }
// )(Header);