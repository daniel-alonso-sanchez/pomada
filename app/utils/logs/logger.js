var winston = require('winston');
var config = require('config');
winston.loggers.add('app', {
    console: config.get("app").log
  });
module.exports = winston.loggers.get('app');
   