/**
var kueService=require('./services/queue/bullService')
kueService.createJob({
  title: 'ola ke ase',play: 'site.yml' , role: 'utils'
});
**/
var config = require('config');
var dbConfig = config.get('redis');
var matador = require('bull-ui/app')({
  redis: {
    host: dbConfig.host,
    port: dbConfig.port
  }
});
  matador.listen(1337, function(){
    console.log('bull-ui started listening on port', this.address().port);
  });

