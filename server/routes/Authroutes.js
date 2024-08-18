const {register,login}=require('../controllers/Authcontroller');
// Importing express and creating a new router instance
const express= require('express');
const app=express();
app.post('/login',login);
app.post('/register',register);
module.exports = app;