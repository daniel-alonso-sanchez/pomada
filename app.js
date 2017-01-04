'use strict';

var app = require('./lib/server');
var bullService=require('./services/queue/bullService');
/**
* @param {Object} options
* @param {Object} [options.redis] optional redis settings (host, port, password).
*   Defaults to the development redis settings in ./config
*
*/
module.exports = function(options) {
  require('./lib/setupAndMiddleware')(app, options);
  
  return app;
};