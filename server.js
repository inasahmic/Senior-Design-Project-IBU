const Hapi = require('@hapi/hapi');
const HapiInert = require('@hapi/inert')
const Path = require('path');

const newsScraper = require('./scraper');
const sportScraper = require('./sport')
const svijetScraper = require('./svijet')
const techScraper = require('./tehno')
const biznisScraper = require('./biznis')
const autoScraper = require('./auto')
const lifestyleScraper = require('./lifestyle')

const init = async () => {

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });
  await server.register(HapiInert);

  server.route({
    method: "GET",
    path: '/{param*}',
    handler: {
      directory: {
        path: Path.join(__dirname, 'blog'),
        index: ['index.html']
      }
    }
  })  

  server.route({
    method: "GET",
    path: "/api/news",
    handler: async (request, h) => {
      const result = await newsScraper();
      console.log(result);
      return result;
      
    }
  });
  server.route({
    method: "GET",
    path: "/api/sport",
    handler: async (request, h) => {
      const result = await sportScraper();
      return result;
    }
  });
  server.route({
    method: "GET",
    path: "/api/svijet",
    handler: async (request, h) => {
      const result = await svijetScraper();
      return result;
    }
  });
  server.route({
    method: "GET",
    path: "/api/tehno",
    handler: async (request, h) => {
      const result = await techScraper();
      return result;
    }
  });
  server.route({
    method: "GET",
    path: "/api/biznis",
    handler: async (request, h) => {
      const result = await biznisScraper();
      return result;
    }
  });
  server.route({
    method: "GET",
    path: "/api/auto",
    handler: async (request, h) => {
      const result = await autoScraper();
      return result;
    }
  });
  server.route({
    method: "GET",
    path: "/api/lifestyle",
    handler: async (request, h) => {
      const result = await lifestyleScraper();
      return result;
    }
  });



  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();