require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 3000;

//  middlewares
app.use(
  express.urlencoded( {
      extended: true
  } ),
  express.json()
);

// routes
app.get('/', (req, res) => {
  res.send( {
    message: "api test"
  } )
});

// Blhv9PjkyzRcsDmh

const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD

// mongodb+srv://gabrieloll:<password>@gh-api-cluster.nkavpon.mongodb.net/?retryWrites=true&w=majority

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
