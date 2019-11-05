const express = require('express');
const mongoose = require('mongoose');
const hbs = require('express-handlebars')
const axios = require('axios');
const cheerio = require('cheerio');

const PORT = process.env.PORT || 3000;


const app = express();

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.engine('handlebars', hbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

const router = require('./controllers/routes');
app.use(router);

app.listen(PORT, () => console.log(`listening on ${PORT}`));