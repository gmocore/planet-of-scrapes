const router = require("express").Router();
const cheerio = require("cheerio");
const axios = require("axios");
const mongoose = require("mongoose");

const db = require("../models/app");

mongoose.connect(
  "mongodb+srv://gerritt:gerritt@planet-of-scrapes-wmmte.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

router.get('/assets/css/style.css', (req, res) => {
  res.sendFile(__dirname, 'assets/css/style.css')
})


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
      res.redirect('/');
      
    })
    .catch(err => {
      console.log(err);
      res.sendStatus(500);
    });
});

router.get('/saved', (req, res) => {
  db.Article.find({saved: true }, (err, saved) => {
      if (err) throw err;

      res.render('saved', { saved: saved })
  })
 
});

router.get("/saved/:id", (req, res) => {
    db.Article.findOne({ _id: req.params.id })
      .populate("note")
      .then((dbArticle) => {
        res.json(dbArticle);
      })
      .catch((err) => {
        res.json(err);
      });
  });

router.post("/saved/:id", (req, res) => {
  db.Note.create(req.body)
    .then((dbNote) => {
      console.log(dbNote)
      return db.Article.findByIdAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
    })
    .then((dbArticle) => {
      res.json(dbArticle);
    })
    .catch((err) => {
      res.json(err);
    });
});

  
router.delete('/articles/:id', (req, res) => {
  db.Article.findByIdAndRemove({_id: req.params.id})
  .then(removed => res.json(removed))
  .catch(err => res.json(err))
});



router.post('/articles/:id', (req, res) => {
  db.Article.findByIdAndUpdate({_id: req.params.id}, {$set: { saved: true }})
  .then(saved => res.json(saved))
  .catch(err => res.json(err))
});

router.post('/clear', (req, res) => {
  db.Article.deleteMany({})
  .then(removed => res.json(removed))
  .catch(err => res.json(err))
})

module.exports = router;
