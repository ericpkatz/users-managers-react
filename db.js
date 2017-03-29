const Sequelize = require('sequelize');

const conn = new Sequelize(process.env.DATABASE_URL);

const Product = conn.define('product', {
  name: conn.Sequelize.STRING
});

const User = conn.define('user', {
  name: conn.Sequelize.STRING,
  isManager: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: false
  }
});

User.belongsTo(User, { as: 'manager' });
User.hasMany(User, { as: 'manages', foreignKey: 'managerId'});


const sync = ()=> conn.sync({ force: true });

const seed = ()=> {
  const products = ['foo', 'bar', 'bazz'];
  const users = ['moe', 'larry', 'curly'];

  let moe, larry, curly;

  return sync()
    .then(()=> {
      const promises = products.map(name => Product.create({ name }));
      return Promise.all(promises);
    })
    .then(()=> {
      const promises = users.map(name => User.create({ name }));
      return Promise.all(promises);
    })
    .then( result => {
      [ moe, larry, curly ] = result;
    })
    .then( () => {
      moe.isManager = true;
      larry.isManager = true;
      return Promise.all([ moe.save(), larry.save()]);
    })
    .then( () => {
      Promise.all([
        larry.setManager(moe),
        curly.setManager(larry)
      ]);
    });
};

module.exports = {
  models: {
    Product,
    User
  },
  sync,
  seed
};
