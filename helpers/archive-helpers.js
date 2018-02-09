var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  // read urls from sites.txt
  // use paths.list
  // need a callback function to deal with async behavior
  fs.readFile(exports.paths.list, (err, data) => {
    callback(err, `${data}`.split('\n'));
  });
};


exports.isUrlInList = function(url, callback) {
  // check to see if requested url is in our list
  // use paths.list

  fs.readFile(exports.paths.list, (err, data) => {
    if (data.toString().indexOf(url) >= 0) {
      callback(err, true);
    } else {
      callback(err, false);
    }
  });
};

exports.addUrlToList = function(url, callback) {
  // add requested url to list
  // use paths.list
  fs.appendFile(exports.paths.list, url, (err, data) => {
    callback(err, url);
  });
};

exports.isUrlArchived = function(url, callback) {
  // check to see if the requested url is in archive
  // use paths.archivedSites
  
  fs.readdir(exports.paths.archivedSites, (err, data) => {
    if (data.indexOf(url) >= 0) {
      callback(err, true);
    } else {
      callback(err, false);
    }
  });
};

exports.downloadUrls = function(urls) {
  // download to our archive
  // use siteAssets and archivedSites?
  // get the source html from the internet
  _.each(urls, function(url) { 
    fs.writeFile(exports.paths.archivedSites + '/' + url);
  });

};
