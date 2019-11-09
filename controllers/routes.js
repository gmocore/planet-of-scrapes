// import packages
const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");

// import models
const db = require("../models/app");

// connect to db
mongoose.connect(
  "mongodb+srv://gerritt:gerritt@planet-of-scrapes-wmmte.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

// get route for css
router.get("/assets/css/style.css", (req, res) => {
  res.sendFile(__dirname, "assets/css/style.css");
});

// get route for home page
router.get("/", (req, res) => {
  // find all articles in db
  db.Article.find((err, article) => {
    if (err) throw err;

    // render articles from db using handlebars
    res.render("index", { article: article });
  });
});

// get route to scrape articles
router.get("/scrape", (req, res) => {
  // get data from source site
  axios
    .get("https://www.freecodecamp.org/news")
    .then(response => {
      // parse data with cheerio
      const $ = cheerio.load(response.data);
      
      // boolean flag to track new articles
      let areThereNewArticles = false;

      // store desired fields in object for each scraped article
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

        // create article in db
        // db.Article.create(result)
        //   .then(article => {
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });

        db.Article.findOne({ title: result.title })
        .then(existingArticle => {
          if(!existingArticle) {
            areThereNewArticles = true;

            db.Article.create(result)
            .then(article => {
              // console.log(article)
            })
            .catch(err => {
              console.log(err);
            });
          } 
        })
        .catch(err =>  res.json(err))
      });

      // send if new articles are not found
      if (!areThereNewArticles) {
        return res.send('no new articles')

      }

      // 
      return res.send("All scraped up");
    })
    // check for errors
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

// display all saved articles
router.get("/saved", (req, res) => {
  db.Article.find({ saved: true }, (err, saved) => {
    if (err) throw err;
    // render saved articles using handlebars
    res.render("saved", { saved: saved });
  });
});

// route to display comments for a specific article
router.get("/saved/:id", (req, res) => {
  db.Article.findOne({ _id: req.params.id })
    .populate("notes")
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

// route to add a comment to an article
router.post("/saved/:id", (req, res) => {
  db.Note.create(req.body)
    .then(dbNote => {
      console.log(dbNote);
      return db.Article.findByIdAndUpdate(
        { _id: req.params.id },
        {$push: {notes: dbNote._id} },
        { new: true }
      );
    })
    .then(dbArticle => {
      res.json(dbArticle);
    })
    .catch(err => {
      res.json(err);
    });
});

// route to delete an article
router.delete("/articles/:id", (req, res) => {
  db.Article.findByIdAndRemove({ _id: req.params.id })
    .then(removed => res.json(removed))
    .catch(err => res.json(err));
});

// route for saving an article
router.post("/articles/:id", (req, res) => {
  db.Article.findByIdAndUpdate(
    { _id: req.params.id },
    // update saved to true
    { $set: { saved: true } }
  )
    .then(saved => res.json(saved))
    .catch(err => res.json(err));
});

// clear all articles
router.post("/clear", (req, res) => {
  db.Article.deleteMany({})
    .then(removed => res.json(removed))
    .catch(err => res.json(err));
});

// route to delete a comment
router.delete("/comments/:id", (req, res) => {
  db.Note.findByIdAndRemove({ _id: req.params.id })
    .then(removed => res.json(removed))
    .catch(err => res.json(err));
});

module.exports = router;
