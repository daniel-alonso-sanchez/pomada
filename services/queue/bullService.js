var Queue = require('bull');
var config = require('config');
var app = config.get('app');
var ansibleQueue = Queue('ansible', app.redis.port, app.redis.host);


ansibleQueue.process(function(job, done){
  runProvision(job.data, done);
});

function runProvision(address, done) {
  console.log ("consumido");
  done();
}

function createJob(data){ 
  ansibleQueue.add({data});  
};
module.exports = {
    createJob: createJob
}
