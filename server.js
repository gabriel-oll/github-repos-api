require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
var port = process.env.PORT || 80
const profilesRouter = require('./api/src/routes/ProfilesRouter')

const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASSWORD

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// routes 
app.use('/profile', profilesRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

mongoose
  .connect(`mongodb+srv://${db_user}:${db_pass}@gh-api-cluster.nkavpon.mongodb.net/?retryWrites=true&w=majority`)
  .then(console.log('conection success'));