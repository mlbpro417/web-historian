var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');


// require more modules/folders here!

var body;

var statusCode = 200;
var postCode = 201;
var failCode = 404;


var defaultCors = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};






exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    archive.readListOfUrls();
    res.end();
  }
  res.end(archive.paths.list);
};
