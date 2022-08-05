require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const profilesRouter = require('../routes/ProfilesRouter')

const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// routes
app.use('/profile', profilesRouter)
// create

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