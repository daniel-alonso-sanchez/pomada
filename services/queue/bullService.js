var shellService = require('../shell/shellService');
var config = require('config');
var logger = require.main.require('./utils/logs/logger');
var app = config.get('app');
var validation= require('../../utils/validation/jschemaValidation');
var kue = require('kue'), 
ansibleQueue = kue.createQueue({
  redis: app.redis.url
});
kue.app.listen(app.port);
logger.debug("kue rest api is listening on port "+ app.port);

ansibleQueue.process('ansible',function(job, done){
	  /**
	  better job handline
	  **/
	  var domain = require('domain').create();
	  domain.on('error', function(err){
		done(err);
	  });
	  domain.run(function(){ // your process function	
		logger.debug("processing job "+job.id);
		validateJob(job)
		runProvision(job, done);		
	  });

});
function validateJob(job) {

 if (!validation.validate(job.data)){
    logger.error ('Job %d json metadata is not valid. Must match this json schema: %s',job.id,JSON.stringify(validation.jsonSchema));
    throw new Error( 'Json request is not valid. Must match this json schema: '+JSON.stringify(validation.jsonSchema) );
 }
}
function runProvision(job, done) {
  
  shellService.run(job,done); 
}

function createJob(data){
  ansibleQueue.add({data});
};
module.exports = {
    createJob: createJob
}
