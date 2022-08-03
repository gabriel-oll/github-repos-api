require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;
const Profile = require('../models/Profile')
const fetch = (url) => import('node-fetch').then(({default: fetch}) => fetch(url));


const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// routes

// create
app.post('/profile', (req, res) => {

let userProfile  = req.body.user

let url = `https://api.github.com/users/${userProfile}`
fetch(url)
.then(function(response){ 
  return response.json()
})
.then(function(data) {
  const userLogs = {
    username: data.login,
    avatar: data.avatar_url, 
    profileUrl: data.html_url,
    bio: data.bio,
    qtdRepos: data.public_repos,
    followers: data.followers,
  }
  Profile.create(userLogs)
  res.send(userLogs)  
})
})

// app.get('/', (req, res) => {
//   res.send()
// })
mongoose
  .connect(`mongodb+srv://${db_user}:${db_pass}@gh-api-cluster.nkavpon.mongodb.net/?retryWrites=true&w=majority`)
  .then(
    () => {
      console.log('conection success')
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
    }
  );