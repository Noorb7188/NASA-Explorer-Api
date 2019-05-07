const fs = require('fs');
const path = require('path');
const querystring = require('querystring');
const url = require('url');
const rqst = require('request');
const env = require('dotenv').config();

const handlerHome = (request, response) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');
  fs.readFile(filePath, (error, file) => {
    if (error) {
      response.writeHead(404, {'Content-Type' : 'text/html'});
      response.end('<h1> Something is wrong in loading your Home page </h1>');
    } else {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.end(file);
    }
  })
};

const handlerPublic = (request, response, url) => {
  const extension = url.split(".")[1];
  const type = {
    html : 'text/html',
    css : 'text/css',
    js : 'application/javascript',
    png : 'image/png'
  };
  const filePath = path.join(__dirname, '..', url);
  fs.readFile(filePath, (error, file) => {
    if (error) {
    response.writeHead(404, {'Content-Type' : 'text/html'});
    response.end('<h1> Something went wrong while loading your files </h1>');
  } else {
    response.writeHead(200, {'Content-Type' : type[extension] });
    response.end(file)
  }
});
};

const handlerPicData = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const myUrl = `https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`;
  rqst(myUrl, (err, res, body) => {
    const parsedBody = JSON.parse(body);
    if (err) {
      res.writeHead(404, {'Content-Type' : 'text/html'});
      res.end('<h1>Sorry, there is something wrong in the handlerPicData function </h1>');
    } else {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.end(JSON.stringify(parsedBody));
    }
  });
};

const handlerSearch = (request, response) => {
  const parsedUrl = url.parse(request.url);
  const fetchData = parsedUrl.query;
  const parsedQuery = querystring.parse(fetchData);
  const start = parsedQuery.start_date;
  const end = parsedQuery.end_date;
  const myUrl = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start}&end_date=${end}&api_key=${process.env.API_KEY}`;
  rqst(myUrl, (err, res, body) => {
    const parsedBody = JSON.parse(body);
    console.log("my result is", JSON.stringify(parsedBody.near_earth_objects));
    if (err) {
      res.writeHead(404, {'Content-Type' : 'text/html'});
      res.end('<h1> Sorry something went wrong in your handlerSearch function</h1>');
    } else {
      response.writeHead(200, {'Content-Type' : 'text/html'});
      response.end(JSON.stringify(parsedBody.near_earth_objects));
    }

  })

}

module.exports = {
  handlerHome,
  handlerPublic,
  handlerPicData,
  handlerSearch
}
