// models/user.js
const db = require('../config/db');

const User = {
  create: (name, email, passwordHash, callback) => {
    db.query('INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)', [name, email, passwordHash], callback);
  },
  findByEmail: (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
  }
};

module.exports = User;
