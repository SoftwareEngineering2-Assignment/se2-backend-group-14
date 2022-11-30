const {isNil} = require('ramda');

const yup = require('yup');
const {min} = require('./constants');

// Email input validation
const email = yup
  .string()
  .lowercase()
  .trim()
  .email();

//  Username input validation
const username = yup
  .string()
  .trim();

//  Password input validation
const password = yup
  .string()
  .trim()
  .min(min);

/* 
* Forgotten password form request
* Password input validation
*/
const request = yup.object().shape({username: username.required()});

/* 
* Sign in form validator
* Checks username and password input
*/
const authenticate = yup.object().shape({
  username: username.required(),
  password: password.required()
});

/* 
* Sign up form validator
* Checks username, password and email input
*/
const register = yup.object().shape({
  email: email.required(),
  password: password.required(),
  username: username.required()
});

/* 
* Update form validator
* Checks username and password input
*/
const update = yup.object().shape({
  username,
  password
}).test({
  message: 'Missing parameters',
  test: ({username: u, password: p}) => !(isNil(u) && isNil(p))
});

/* 
* Change password form validator
* Checks password input
*/
const change = yup.object().shape({password: password.required()});

module.exports = {
  authenticate, register, request, change, update
};
