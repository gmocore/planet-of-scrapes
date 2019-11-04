const router = require("express").Router();
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
  axios.get('https://www.freecodecamp.org/news').then(response => {
    const $ = cheerio.load(response.data);
    
    $('.post-card-title').each((i, element) => {

      let result = {};

      result.title = $(element)
      .children()
      .text()
      .trim();

      result.link = $(element)
        .children()
        .attr("href");

      result.tags = $(element)
      .siblings('.post-card-tags')
      .children('a')
      .text()
      .trim();

      result.author = $(element)
      .parent('.post-card-header')
      .parent('.post-card-content-link')
      .siblings('.post-card-meta')
      .children('a')
      .text()
      .trim();

      console.log(result);
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
