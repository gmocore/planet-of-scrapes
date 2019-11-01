const router = require("express").Router();
const Scraper = require('../models/Scraper')

const MongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://gerritt:gerritt@planet-of-scrapes-wmmte.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const assert = require('assert');

router.get("/", (req, res) => {
    client.connect(function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");
       
        const db = client.db('sample_supplies');
       
        
          findDocuments(db, function() {
            client.close();
          });
        
      });
  

  res.render("index");
});

const findDocuments = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('sales');
    // Find some documents
    collection.find({couponUsed: true, storeLocation: 'Seattle'}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs)
      if (docs.length > 0) {
          callback(docs);
      } else {
          console.log('no docs found')
      }
    });
  }

  router.get('/scraped', (req, res) => {
    Scraper();
  })
module.exports = router;
