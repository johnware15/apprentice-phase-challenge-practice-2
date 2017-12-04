import db from '../db'
const bcrypt = require('bcrypt')

const signInText = `SELECT email, password FROM users WHERE email = $1`;
const signInEmailText = `SELECT email FROM users WHERE email = $1`;

const signIn = function(text, values, password) {
  let dbPassword
  return db.query(text, values)
  .then(result => {
    dbPassword = result.rows[0].password
    return bcrypt.compare(password, dbPassword)
    .then(result => result)
  })
  .catch(error => {
    console.log('Did not find user');
    console.log(error);
  })
}

const signInEmail = function(text, values) {
  return db.query(text, values)
  .then(result => result.rows[0].email)
  .catch(error => {
    console.log(error);
    return undefined;
  })
}

module.exports = {
  signIn,
  signInText,
  signInEmail,
  signInEmailText
}
