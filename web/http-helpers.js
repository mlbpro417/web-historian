var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  fs.readFile(archive.paths.siteAssets + asset, function(err, body) {
    if (err) {
      throw err;
    } else {
      res.writeHead(statusCode, headers);
      res.end(`${body}`);
    }  
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
  });
};

// this could include the homepage, loading page, and the archived html

// asset could either be the loading html, or the actual html that has been archived




// As you progress, keep thinking about what helper functions you can put here!
