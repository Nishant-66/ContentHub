const {register,login,getProfile, logout }=require('../controllers/Authcontroller');
// Importing express and creating a new router instance
const express= require('express');
const app=express();
app.post('/login',login);
app.post('/register',register);
app.get('/profile', getProfile);
app.post('/logout', logout);
module.exports = app;