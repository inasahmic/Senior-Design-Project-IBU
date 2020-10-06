const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

// const getKlixTech = () => {
//   const url = 'https://klix.ba';
//   return puppeteer
//   .launch()
//     .then(browser => browser.newPage())
//     .then(page => {
//       return page.goto(url + '/scitech/tehnologija').then(function () {
//         return page.content();
//       });
//     })
//     .then(html => {
//       const $ = cheerio.load(html);
//       const newsHeadlines = [];
//       $('article').each(function () {
//         const link = url + $(this).find('a').attr('href');
//         const img = $(this).find('.img > img').attr('src');
//         const title = $(this).find('.above > span').text();
//         const desc = $(this).find('a > h2').text();
//         newsHeadlines.push({
//           title,
//           desc,
//           link,
//           img
//         });
//       });
  
//       return newsHeadlines;
//     })
//     .catch(console.error);
// }


const getNoneNews = () => {
  const url = 'http://ba.n1info.com/';
  return puppeteer
  .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url + '/Science').then(function () {
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
        if (img) {
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


const getAvazNews = () => {
  const url = 'https://avaz.ba';
  return puppeteer
  .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url + '/lifestyle/it').then(function () {
        return page.content();
      });
    })
    .then(html => {
      
      const $ = cheerio.load(html);
      const newsHeadlines = [];
      $('.list-timeline-item').each(function () {
        const link = $(this).find('.thumb-box > a').attr('href');
        const img = url + $(this).find('.thumb-box > a > img').attr('src');
        const title = $(this).find('.article-title > h4 > a').text();
        const desc = $(this).find('.articles-intro > p').text();
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
const getAll = async () => {
    return Promise.all([
      
      // getKlixTech(),
      getAvazNews(),
      getNoneNews()
    
    ])
    .then(data => ({
      avazTech: data[0],
      nOne: data[1]
    }))
  }
  
  module.exports = getAll;