import React, { Component } from 'react';
import axios from 'axios';
import { Link, Route, hashHistory, Router, IndexRoute } from 'react-router';

class App extends Component{
  constructor(props){
    super();
    this.state = { users: [], managers: [], foo: 'bar' }
    this.onManagerChange = this.onManagerChange.bind(this);
  }
  loadFromServer(){
    return Promise.all([
      axios.get('/api/users'),
      axios.get('/api/managers')
    ])
    .then( responses => responses.map( response => response.data))
    .then( ([ users, managers])=> this.setState({users, managers}));
  }
  onManagerChange(user, manager){
    axios.put(`/api/users/${user.id}`, { managerId: manager })
      .then( ()=> this.loadFromServer())
      .then( ()=> this.props.router.push('/users'));
  }
  componentDidMount(){
    this.loadFromServer();
  }
  render(){
    const props = Object.assign({}, this.state, { onManagerChange: this.onManagerChange});
    const active = (pathname)=> this.props.router.location.pathname === pathname || ( pathname.length > 1 && this.props.router.location.pathname.startsWith(pathname)); 
    return (
      <div className='container'>
        <h1>Users Managers React</h1>
        <ul className='nav nav-tabs' style={ { marginBottom: '10px'} }>
          <li className={ active('/') ? 'active': ''}>
            <Link to='/'>Home</Link>
          </li>
          <li className={ active('/users') ? 'active': ''}>
            <Link to='/users'>Users ({ this.state.users.length })</Link>
          </li>
        </ul>
        { this.props.children && React.cloneElement(this.props.children, props) }
      </div> 
    );
  }
}

export default App;
