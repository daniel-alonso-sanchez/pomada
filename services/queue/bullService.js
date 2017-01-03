var Queue = require('bull');
var config = require('config');
var dbConfig = config.get('redis');
var ansibleQueue = Queue('ansible', dbConfig.port, dbConfig.host);


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