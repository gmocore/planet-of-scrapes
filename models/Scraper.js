const cheerio = require("cheerio");
const axios = require("axios");

let Scraper = () => {
  axios.get("https://old.reddit.com/r/webdev/").then(response => {
    const $ = cheerio.load(response.data);

    let results = [];

    $("p.title").each((i, element) => {
      const title = $(element).text();
      const link = $(element)
        .children()
        .attr("href");

      results.push({
        title: title,
        link: link
      });
    });

    console.log(results);
  }).catch(error => {
      if (error) throw error;
  });
};

module.exports = Scraper;
