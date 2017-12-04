import '../env'
import db from '../db'
import { expect } from 'chai';
import { signUp, signIn } from '../../src/actions';
import { chai } from 'chai'
import { chaiHttp } from 'chai-http'
import { request } from 'chai'

describe('function signUp ', () => {
  let user = [
    'a',
    'a@a.com',
    'a'
  ]
  before(function() {
    return signUp(signUpText, user).then((result) => {
    })
  })
  it('should create a new row in the users table', () => {
    return signIn(signInText, ['a@a.com'], 'a').then((result) => {
      expect(result).to.equal(true)
    })
  })
  after(function() {
    db.query('TRUNCATE TABLE users')
    .then(result => console.log('Truncated Table'))
    .catch(error => console.log(error))
  })
})
