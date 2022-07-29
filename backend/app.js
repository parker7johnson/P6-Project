//MongoDB pw : ayt1a9KwVxuaGwRw
//MOngoDB connect : mongodb+srv://parker:ayt1a9KwVxuaGwRw@cluster0.8nntlux.mongodb.net/?retryWrites=true&w=majority

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');


const sauceRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

app.use(express.json());
app.use(helmet());

mongoose.connect('mongodb+srv://parker:ayt1a9KwVxuaGwRw@cluster0.8nntlux.mongodb.net/?retryWrites=true&w=majority') //connecting to mongodb
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!'); //success message in console
  })
  .catch((err) => {
    console.log('Unable to connect to MongoDB Atlas.'); //error message in console
    console.error(err);
  })

  app.use(
    express.static(path.join(__dirname, "..", "frontend", "dist", "hot-takes"))
  );
  app.get("/", (req, res) => {
    res.sendFile(
      path.join(__dirname, "..", "frontend", "dist", "hot-takes", "index.html")
    );
  });

  app.use((req, res, next) => { //allows cross origin access for different server ports
    res.setHeader('Cross-origin-Resource-Policy', 'same-site');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });
  

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
