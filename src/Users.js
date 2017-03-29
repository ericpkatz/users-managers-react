import React from 'react';
import UserItem from './UserItem';
import { Link } from 'react-router';

const Users = ({ users })=> (
  <div className='container'>
    <br />
    { users.map( user=> <UserItem key={ user.id } user={user } />) }
  </div>
); 

export default Users;
