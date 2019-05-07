const handler = require('./handlers');

const router = (request, response) => {
  const url = request.url;
  if (url === '/') {
    handler.handlerHome(request, response);
  } else if (url.indexOf('public') !== -1) {
    handler.handlerPublic(request, response, url);
  } else if (url.indexOf('picdata') !== -1) {
    handler.handlerPicData(request, response);
  } else if (url.indexOf('search')!== -1) {
    handler.handlerSearch(request, response);
  }
   else {
    response.writeHead(404, {'Content-Type' : 'text/html'});
    response.end('<h1> Sorry There must be something wrong in your router ! </h1>');
  }
};


module.exports = router
