import { Link } from 'react-router';
import React from 'react';
import UserItem from './UserItem';

const UsersEdit = ({ users, managers, onManagerChange, onCreateUser, onDeleteUser })=> (
  <div className='container'>
    <br />
    { users.map( user => <UserItem editing={ true } onDeleteUser={onDeleteUser} key={user.id} user={ user} managers={ managers } onManagerChange={ onManagerChange } />) }
  </div>
); 

export default UsersEdit;
