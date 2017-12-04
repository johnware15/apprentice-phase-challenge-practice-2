const signUp = require('../actions/signUp.js')
const signUpText = require('../actions/signUp.js')
const signIn = require('../actions/signIn.js')
const signInText = require('../actions/signIn.js')

const express = require('express')
const signUpRouter = express.Router()

signUpRouter.get('/sign-up', (req, res) => {
  let errorObj = {
    error: false,
    message: '',
    activeUserError: false
  }

  let redirectObj = {
    redirect: false,
    message: '',
    activeUserRedirect: false
  }

  if(req.session.email) {
    res.redirect('/')
  }

  if(!req.query.error) {
    res.render('sign-up', redirectObj)
  } else if(req.query.redirect === 'redirect1') {
    redirectObj.redirect = true
    redirectObj.message = 'Please fill out forms to continue'
    res.redirect('sign-up', redirectObj)
  } else if(req.query.redirect === 'redirect2') {
    redirectObj.activeUserRedirect = true
    res.render('sign-up', redirectObj)
  } else if(req.query.error === 'error') {
    errorObj.error = true
    errorObj.message = 'Error, please try again.'
  }
})

signUpRouter.post('/sign-up', (req, res, next) => {
  if(!req.body.name || !req.body.email || !req.body.password) {
    res.render('/sign-up/?error=error')
  } else {
    return signInEmail(signInEmailText, [req.body.email])
    .then(result => {
      if(result === req.body.email) {
        res.redirect('/sign-up/?redirect=redirect2')
      } else {
        return signUp(signUpText, [req.body.name, req.body.email, req.body.password])
        .then(result => next())
        .catch(error => res.status(500).error('/sign-up/?error=error'))
      }
    })
    .catch(error => {
      console.log(error);
      res.redirect('/sign-up/?error=error')
    })
  }
})

signUpRouter.post('/sign-up', (req, res) => {
  req.session.email = req.body.email
  res.render('/')
})





module.exports = signUpRouter
