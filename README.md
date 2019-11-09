# planet-of-scrapes

## FreeCodeCamp Web Scraper

## Instructions

- click scrape to collect articles
- scraped articles are displayed on the home page
  - click button to save or delete articles
- click clear to delete all articles
- saved articles are located on saved page
  - add comment via input box
  - view comments or delete article

## code overview

#### Backend

The server is created with `express`. Routes are set up for various endpoints: `/`, `/articles`, `/saved`.
Routes are handled with Express Router and imported to the `server.js` file.
server is connected to MongoDb with mongoose. get routes are used to display data from db with handlebars. 
Post routes are used to update data in the database. Delete routes are used to delete data.
Axios and Cheerio are used to scrape data and store it in the db. Each article is stored in the db and displayed to the frontend using handlebars.

#### Front-end

`index.js` contains ajax requests that correspond with the backend for scraping, saving, viewing and deleting articles. Handlebars is used to display a container for each article that is stored in the database. Bootstrap is used for page styling and responsiveness. 

## Built With:

### Languages

HTML, CSS, jQuery, AJAX, JavaScript, Node.js, MongoDb Atlas, Handlebars

### Packages/APIs

- [Express](https://www.npmjs.com/package/express) -Fast, unopinionated, minimalist web framework for [node](http://nodejs.org/) -
- [Mongoose](https://www.npmjs.com/package/mongoose) -Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
- [Cheerio](https://www.npmjs.com/package/cheerio) -
Fast, flexible & lean implementation of core jQuery designed specifically for the server. 


## Authors

- **Gerritt Black** - _Backend/Front-end/Scripting/Styling/Design/Logic_ - [gmocore](https://github.com/gmocore)

# Deployed App

https://secret-ravine-34348.herokuapp.com/