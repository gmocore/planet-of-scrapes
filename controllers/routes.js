const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");

const db = require("../models/app");

mongoose.connect(
  "mongodb+srv://gerritt:gerritt@planet-of-scrapes-wmmte.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);


router.get("/", (req, res) => {
    db.Article.find((err, article) => {
        if(err) throw err;
        
        res.render("index", {article: article});
    })
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
           
            // console.log(hbObject);
           
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


// Route for grabbing a specific Article by id, populate it with it's note
router.get("/articles/:id", (req, res) => {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.findOne({ _id: req.params.id })
      // ..and populate all of the notes associated with it
      .populate("note")
      .then((dbArticle) => {
        // If we were able to successfully find an Article with the given id, send it back to the client
      

        res.json(dbArticle);
      })
      .catch((err) => {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

router.post("/articles/:id", (req, res) => {
  // Create a new note and pass the req.body to the entry
  let notes = [];

  db.Note.create(req.body)
    .then((dbNote) => {
      return db.Article.findByIdAndUpdate({ _id: req.params.id }, { note: dbNote._id });
    })
    .then((dbArticle) => {
      // If we were able to successfully update an Article, send it back to the client
      notes.push(dbArticle)
      res.json(dbArticle);
    })
    .catch((err) => {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

  
router.delete('/articles/:id', (req, res) => {
  db.Article.findByIdAndRemove({_id: req.params.id})
  .then(removed => res.json(removed))
  .catch(err => res.json(err))
})

module.exports = router;
