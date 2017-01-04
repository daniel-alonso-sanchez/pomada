var shellService = require('../shell/shellService');
var config = require('config');
var app = config.get('app');
var kue = require('kue'), 

ansibleQueue = kue.createQueue({
  redis: app.redis.url
});
kue.app.listen(app.port);
console.log("kue rest api is listening on port "+ app.port);

ansibleQueue.process('ansible',function(job, done){
	  /**
	  better job handline
	  **/
	  var domain = require('domain').create();
	  domain.on('error', function(err){
		done(err);
	  });
	  domain.run(function(){ // your process function	
		console.log("processing job "+job.id);
		runProvision(job, done);
		//throw new Error( 'bad things happen' );
		//done();
	  });

});

function runProvision(job, done) {
  
  shellService.run(job,done); 
}

function createJob(data){
  ansibleQueue.add({data});
};
module.exports = {
    createJob: createJob
}
