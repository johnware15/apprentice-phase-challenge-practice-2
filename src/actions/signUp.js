import db from '../db'
const bcrypt = require('bcrypt')

const signUpText = `INSERT INTO users(name, email, password) VALUES ($1, $2, $3)`;

const signUp = function(text, values) {
  let dbPassword = values[2]
  return bcrypt.hash(dbPassword, 10)
  .then(hash => {
    values[2] = hash
    return client.query(text, values)
    .then(result => console.log('Sucessfully added data to users table'))
    .catch(error => {
      console.log('Could not insert');
      console.log(error);
    })
  })
  .catch(error => {
    console.log('Could not hash password');
    console.log(error);
  })
}

module.exports = {
  signUp,
  signUpText
}


// export default function signUp() {
//   db.query(`INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`);
// }
