const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://gerritt:gerritt@planet-of-scrapes-wmmte.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
