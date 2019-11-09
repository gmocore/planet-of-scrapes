// import packages
const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars')

// set port
const PORT = process.env.PORT || 3000;

// initialize app
const app = express();

// set mongoose middleware
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//set express middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

// set handlebars middleware
app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// import and use router
const router = require('./controllers/routes');
app.use(router);

//start server
app.listen(PORT, () => console.log(`listening on ${PORT}`));