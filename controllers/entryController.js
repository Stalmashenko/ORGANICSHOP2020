const express = require('express');
const {Users} = require('../models/sequelize.js');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.registry = function (request, response) {
  if (request.isAuthenticated()) 
    {
        response.render("registry", {login:false, 
        message: request.flash()}); 
    }
    else
    {
        response.render("registry", {login:false,
        message: request.flash()});        
    }
};
exports.login = function (request, response, next) {
    const { email, password } = request.body;
    console.log(email);
    passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/entry',
    failureFlash: true
  })(request, response, next);
};

exports.add = function (request, response) {
  console.log(request.body);
  const role = 0;
  var passwordHash = '';
  const { surname, name, phone, email, password } = request.body;
  // const surname = request.body.surname;
  // const name = request.body.name;
  // const phone = request.body.phone;
  // const email = request.body.email;
  // const password = request.body.password;
  // let errors = [];
  //
  // if (!name || !email || !password || !password2 || !gender) {
  //   errors.push({ msg: 'Please enter all fields' });
  // }
  //
  // if (password.length < 6) {
  //   errors.push({ msg: 'Password must be at least 6 characters' });
  // }

  //if (errors.length > 0) {
  //res.render('register', {
  //errors,
  //name,
  //email,
  //password,
  //password2,
  //gender
  //});
  //} else {
  // User.findOne({ where: { email: email }}).then(user => {
  //   if (user) {
  //     errors.push({ msg: 'Email already exists' });
  //     res.render('registry', {
  //       errors,
  //       surname,
  //       name,
  //       email,
  //       phone,
  //       password
  //     });
  //   } else {

  // Users.create({
  //   surname: request.body.surname,
  //   name: request.body.name,
  //   email: request.body.email,
  //   phone: request.body.phone,
  //   role: 0,
  //   password: passwordHash
  //   }).then(res=>{
  //     console.log(res);
  //   }).catch(err=>console.log(err));


  bcrypt.genSalt(10, (err, salt) => {
             bcrypt.hash(request.body.password, salt, (err, hash) => {
               const newUser = Users.build({
               surname: surname,
               name: name,
               email: email,
               phone: phone,
               role: 0,
               password: hash
              })
               newUser.save();               
          })
        });
        response.redirect('/entry');
};
