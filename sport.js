const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

const getKlixSport = () => {
  const url = 'https://klix.ba';
  return puppeteer
  .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url + '/sport/sve').then(function () {
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
const getvijestiSport = () => {
  const url = 'https://vijesti.ba/';
  return puppeteer
  .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url + '/kategorija/sport').then(function () {
        return page.content();
      });
    })
    .then(html => {
      const $ = cheerio.load(html);
      const newsHeadlines = [];
      $('article').each(function () {
        const link = url + $(this).find('a').attr('href');
        const img = $(this).find('.cat-small-image > a > img').attr('src');
        const title = $(this).find('h3 > a').text();
        const desc = $(this).find('p').text();
        if (img) {
          newsHeadlines.push({
            title,
            desc,
            link,
            img: 'https://vijesti.ba' + img,
          });

        }
      });
  
      return newsHeadlines;
    })
    .catch(console.error);
}
// const getradiosvijet = () => {
//   const url = 'https://radiosarajevo.ba/';
//   return puppeteer
//   .launch()
//     .then(browser => browser.newPage())
//     .then(page => {
//       return page.goto(url + '/sport').then(function () {
//         return page.content();
//       });
//     })
//     .then(html => {
//       const $ = cheerio.load(html);
//       const newsHeadlines = [];
//       $('.newsblock').find('.newsitem').each(function () {
//         const link = $(this).find('a').attr('href');
//         let img = $(this).find('.imgbox').css('background-image');
//         img = img ? img.match(/url\(["']?([^"']*)["']?\)/)[1] : img;
//         const title = $(this).find('p').text();
//        // const desc = $(this).find('a > h2').text();
        
//         newsHeadlines.push({
//           title,
//          // desc,
//           link,
//           img,
          
//         });
//       });
  
//       return newsHeadlines;
//     })
//     .catch(console.error);
// }
const getAll = async () => {
    return Promise.all([
      
      getKlixSport(),
      getvijestiSport(),
      // getradiosvijet()
    
    ])
    .then(data => ({
      klix: data[0],
      vijestiSport: data[1],
      // radioSa: data[2],
    }))
  }
  
  module.exports = getAll;