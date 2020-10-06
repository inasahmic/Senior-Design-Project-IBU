const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const getKlixLife = () => {
  const url = 'https://klix.ba';
  return puppeteer
  .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url + '/lifestyle/sve').then(function () {
        return page.content();
      });
    })
    .then(html => {
      const $ = cheerio.load(html);
      const newsHeadlines = [];
      $('article').each(function () {
        const link = url + $(this).find('a').attr('href');
        const img = $(this).find('.img > img').attr('src');
        const title = $(this).find('.above > span').text();
        const desc = $(this).find('a > h2').text();
        newsHeadlines.push({
          title,
          desc,
          link,
          img
        });
      });
  
      return newsHeadlines;
    })
    .catch(console.error);
}

const getradiosvijet = () => {
  const url = 'https://radiosarajevo.ba/';
  return puppeteer
  .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url + '/magazin').then(function () {
        return page.content();
      });
    })
    .then(html => {
      const $ = cheerio.load(html);
      const newsHeadlines = [];
      $('.newsitem.sect-vijesti  ').each(function () {
        const link = $(this).find('a').attr('href');
        const img = $(this).find('.imgbox').css('background-image');
        img = img ? img.match(/url\(["']?([^"']*)["']?\)/)[1] : img;
        const title = $(this).find('p').text();
       // const desc = $(this).find('a > h2').text();
        
        newsHeadlines.push({
          title,
         // desc,
          link,
          img,
          
        });
      });
  
      return newsHeadlines;
    })
    .catch(console.error);
}
const getNoneNews = () => {
  const url = 'http://ba.n1info.com/';
  return puppeteer
  .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url + '/Lifestyle').then(function () {
        return page.content();
      });
    })
    .then(html => {
      const $ = cheerio.load(html);
      const newsHeadlines = [];
      $('.news-container').find('article').each(function () {
        const link = $(this).find('a').attr('href');
        let img = $(this).find('.inner-img').css('background-image')
        img = img ? img.match(/url\(["']?([^"']*)["']?\)/)[1] : img;
        const title = $(this).find('.title > a').text();
        const desc = $(this).find('a > h2').text();
        if ( img ) {
          newsHeadlines.push({
            title,
            desc,
            link,
            img
          });
        }
      });
  
      return newsHeadlines;
    })
    .catch(console.error);
}

const getAll = async () => {
    return Promise.all([
      
      // getKlixLife(),
      getradiosvijet(),
      getNoneNews()
    
    ])
    .then(data => ({
      life: data[0],
      //klix: data[1],
      nOne: data[1],
      //express: data[3],
    }))
  }
  
  module.exports = getAll;