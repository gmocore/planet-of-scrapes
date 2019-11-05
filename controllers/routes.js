const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");

const db = require("../models/app");

mongoose.connect(
  "mongodb+srv://gerritt:gerritt@planet-of-scrapes-wmmte.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// const MongoClient = require("mongodb").MongoClient;
// const uri =
//   "mongodb+srv://gerritt:gerritt@planet-of-scrapes-wmmte.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// const assert = require('assert');

router.get("/", (req, res) => {
  res.render("index");
});

router.get("/scrape", (req, res) => {
  axios
    .get("https://www.freecodecamp.org/news")
    .then(response => {
      const $ = cheerio.load(response.data);

      $(".post-card-title").each((i, element) => {
        let result = {};

        result.title = $(element)
          .children()
          .text()
          .trim();

        result.link = $(element)
          .children()
          .attr("href");

        result.tags = $(element)
          .siblings(".post-card-tags")
          .children("a")
          .text()
          .trim();

        result.author = $(element)
          .parent(".post-card-header")
          .parent(".post-card-content-link")
          .siblings(".post-card-meta")
          .children("a")
          .text()
          .trim();

        // console.log(result);
        db.Article.create(result)
          .then(article => {
            let hbObject = {
              article: article
            };
            // console.log(hbObject);
            res.render('index', hbObject)
          })
          .catch(err => {
            console.log(err);
          });
      });

      // res.render(article);
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.post("/scrape", (req, res) => {
  res.send("we have success");
});

module.exports = router;
