const signIn = require('../actions/signIn.js')
const signInText = require('../actions/signIn.js')

const express = require('express')
const signInRouter = express.Router()

signInRouter.get('/sign-in', (req, res) => {
  let errorObj = {
    error: false,
    message: '',
  }
  let redirectObj = {
    redirect: false,
    message: '',
  }
  if(req.session.email) {
    res.redirect('/')
  }

  if(!req.query.redirect) {
    res.redirect('/')
  } else if(req.query.redirect === 'redirect1') {
    redirectObj.redirect = true
    redirectObj.message = 'Please identify yourself'
    res.render('sign-in', redirectObj)
  } else if(req.query.redirect === 'redirect2') {
    redirectObj.redirect = true
    redirectObj.message = 'Email or password was incorrect. Do it over.'
    res.redirect('sign-in', redirectObj)
  } else if(req.query.error === 'error') {
    errorObj.error = true
    errorObj.message = 'Error, please try again'
  }
})

signInRouter.post('/sign-in', (req, res, next) => {
  if(!req.body.email || !req.body.password) {
    res.redirect('sign-in/?redirect=redirect1')
  } else {
    return signIn(signInText, [req.body.email], req.body.password)
    .then(result => {
      if(result === true) {
        next()
      } else {
        res.redirect('/sign-up/?redirect=redirect2')
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).redirect('/sign-in/?error=error')
    })
  }
})

signInRouter.post('/sign-in', (req, res) => {
  req.session.email = req.body.email
  res.redirect('/')
})

module.exports = signInRouter
