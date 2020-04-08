const bcrypt = require('bcryptjs');

function Users() {
  this._users = [
    {
      name: 'Kill Bill',
      email: 'bill@gmail.com',
      username: 'kbill',
      password: ''
    },
    {
      name: 'Michael Jackson',
      email: 'jackson@gmail.com',
      username: 'jacko',
      password: ''
    },
    {
      name: 'John Doe',
      email: 'jdoe@gmail.com',
      username: 'jdoe',
      password: ''
    }
  ];
}

Users.prototype.add = function(name, email, username, password) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      this._users.push({
        name,
        email,
        username,
        password: hash
      });
    });
  });
};

Users.prototype.getUsers = function() {
  return this._users.map(user => {
    return { name: user.name, email: user.email, username: user.username };
  });
};

Users.prototype.getUser = function(username) {
  let user = this._users.find(user => user.username === username);
  if (user) {
    delete user.password;
    return user;
  }
};

Users.prototype.find = function(username) {
  return this._users.find(user => user.username === username);
};

Users.prototype.comparePassword = function(password, hash, callback) {
  bcrypt.compare(password, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

module.exports = new Users();
