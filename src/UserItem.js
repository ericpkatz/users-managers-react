import { Link } from 'react-router';
import React from 'react';

const UserItem = ({ user, managers, onManagerChange, editing })=> (
  <div className='panel panel-default'>
    <div className='panel-heading'>
      { user.name }
    </div>
    { 
      editing ? (
    <div className='panel-body'>
      <div className='form-group'>
        <select className='form-control' onChange={(ev)=> onManagerChange(user, ev.target.value)} value={ user.managerId || '' }>
          <option value=''>None</option>
          { managers.map( manager=> <option value={ manager.id } key={ manager.id }>{ manager.name }</option>)}
        </select>
        <Link to='/users'>Cancel</Link>
      </div>
    </div>
    ) : (
        <div className='panel-body'>
          Managed By <Link to='/users/edit'>{ user.manager ? user.manager.name : ' nobody '}</Link>
        </div>
    )}
  </div>
);

export default UserItem;
