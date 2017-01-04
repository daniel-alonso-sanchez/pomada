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
