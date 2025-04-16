// app.js
const express = require('express');
const app = express();
const passport = require('passport');
const jwt = require('./config/jwt');

app.use(passport.initialize());
app.use(passport.session());
app.use(jwt.verifyToken);