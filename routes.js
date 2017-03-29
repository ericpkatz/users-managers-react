const app = require('express').Router();
const models = require('./db').models;

module.exports = app;


app.get('/products', (req, res, next)=> {
  models.Product.findAll({ order: 'name'})
    .then( products => res.send(products ))
    .catch(next);
});

app.get('/users', (req, res, next)=> {
  models.User.findAll({ order: 'name', include: [ { model: models.User, as: 'manager' }]})
    .then( users => res.send(users ))
    .catch(next);
});

app.post('/users', (req, res, next)=> {
  models.User.create(req.body)
    .then( user => res.send(user))
    .catch(next);
});

app.delete('/users/:id', (req, res, next)=>{
  models.User.destroy({ where: { id: req.params.id }})
    .then( ()=> res.sendStatus(200))
    .catch(next);
});

app.put('/users/:id', (req, res, next)=> {
  models.User.findById(req.params.id)
  .then( user => {
    user.managerId = req.body.managerId ? req.body.managerId : null;
    return user.save();
  })
  .then( ()=> res.sendStatus(200))
  .catch(next);
});

app.get('/managers', (req, res, next)=> {
  models.User.findAll({ where: { isManager: true}, order: 'name', include: [ { model: models.User, as: 'manages' }]})
    .then( users => res.send(users ))
    .catch(next);
});
