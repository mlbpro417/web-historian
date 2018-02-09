var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var url = require('url');
var serveAsset = require('./http-helpers');

// require more modules/folders here!

var body;

var statusCode = 200;
var postCode = 201;
var failCode = 404;
var foundCode = 302;

var headers;


var defaultCors = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};


headers = defaultCors;



exports.handleRequest = function (req, res) {

  if (req.method === 'GET') {
    if (req.url === '/') {
      fs.readFile(archive.paths.siteAssets + '/index.html', function(err, body) {
        // console.log(`${body}`);
        res.writeHead(statusCode, headers);
        res.end(`${body}`);
      });
    } else {
      fs.readFile(archive.paths.archivedSites + req.url, function(err, body) {
        if (err) {
          res.writeHead(failCode);
          res.end();
        } else {
          res.writeHead(statusCode, headers);
          res.end(`${body}`);
        }
      });
    } 
    // if were currently in /web and we want to go to /web/public
  } else if (req.method === 'POST') {
    var body;
    req.on('data', (chunk) => {
      body = chunk;
    }).on('end', () => {
      res.writeHead(foundCode, headers);
      fs.appendFile(archive.paths.list, `${body}`.slice(4) + '\n', (err) => {
        if (err) {
          throw err;
        }
      }); 
      res.end();
    });

   
  }

  // if (req.method === 'POST' && req.url === '/') {
  //   var body;
  //   req.on('data', (chunk) => {
  //     console.log(`BODY: ${chunk}`);
  //     body = `${chunk}`;
  //     console.log('test', archive.isUrlInList);  
  //     // if chunk 
  //   });
  //   res.on('end', () => {
  //     // body = `${chunk}`;
  //     if (archive.isUrlInList(body, (err, data) => { console.log(data); })) {
  //       console.log('end of thing');
  //     }
  //   });
    
  
// read list of URLS
// check if URL is in list, 
// if yes, we have the html file archived, serve it up

// else, add to the list
// then, serve up the loading screen html file to the client

// res.end();
};
//   res.end(archive.paths.list);
// };
    // var link;
    // req.on('err', (err) => {
    //   throw err;
    // }).on('data', (chunk) => {
    //   // link = `${chunk}`;
    // }).on('end', () => {
    //   fs.appendFile(archive.paths.list, req.url, (err, data) => {
    //     res.writeHead(302, headers);
    //     res.end();  
    //   });
    // });
