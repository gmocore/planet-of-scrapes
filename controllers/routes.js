const router = require("express").Router();
const Scraper = require('../models/Scraper')
const cheerio = require('cheerio');
const axios = require('axios');

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://gerritt:gerritt@planet-of-scrapes-wmmte.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const assert = require('assert');

// router.get("/", (req, res) => {
//     client.connect(function(err, client) {
//         assert.equal(null, err);
//         console.log("Connected correctly to server");
       
//         const db = client.db('sample_supplies');
       
        
//           findDocuments(db, function() {
//             client.close();
//           });
        
//       });
  

//   res.render("index");
// });

// const findDocuments = function(db, callback) {
//     // Get the documents collection
//     const collection = db.collection('sales');
//     // Find some documents
//     collection.find({couponUsed: true, storeLocation: 'Seattle'}).toArray(function(err, docs) {
//       assert.equal(err, null);
//       console.log("Found the following records");
//       console.log(docs)
//       if (docs.length > 0) {
//           callback(docs);
//       } else {
//           console.log('no docs found')
//       }
//     });
//   }

//   router.get('/scraped', (req, res) => {
//     Scraper();
//   })

router.get('/', (req, res) => {
  res.render('index')
});

router.get('/scrape', (req, res) => {
  axios.get('https://www.polygon.com/news').then(response => {
    const $ = cheerio.load(response.data);
    // console.log($('.c-entry-box--compact__title').children('a').attr('href'))
    
    $('.c-entry-box--compact__title').each((i, element) => {

      let result = {};

      result.title = $(this).children('a').text();
      result.link = $(this).children('a').attr('href');

      console.log(element.children[0]);
    }) 
      
    res.sendStatus(200);
  }).catch(err => {
    console.log(err);
  })
})

router.post('/scrape', (req, res) => {
  res.send('we have success')
});

module.exports = router;
