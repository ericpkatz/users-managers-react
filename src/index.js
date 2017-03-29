import React, { Component} from 'react';
import { render } from 'react-dom';
import { Link, Route, hashHistory, Router, IndexRoute } from 'react-router';
import axios from 'axios';

import Users from './Users';
import UsersEdit from './UsersEdit';
import App from './App';
import Home from './Home';

const root = document.getElementById('root');



const routes = (
  <Router history={ hashHistory }>
    <Route path='/' component={ App }>
      <IndexRoute component={ Home } />
      <Route path='users' component={ Users } />
      <Route path='users/edit' component={ UsersEdit } />
    </Route>
  </Router>
);


render(routes, root);
