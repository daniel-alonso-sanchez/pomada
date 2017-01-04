var Queue = require('bull');
var config = require('config');
var shellService = require('../shell/shellService');
var app = config.get('app');
var ansibleQueue = Queue('ansible', app.redis.port, app.redis.host);


ansibleQueue.process(function(job, done){
console.log ("job:"+JSON.stringify(job));
  runProvision(job.data, done);
});

function runProvision(data, done) {
  
  shellService.run(data,done);
  done();
}

function createJob(data){
  ansibleQueue.add({data});
};
module.exports = {
    createJob: createJob
}
