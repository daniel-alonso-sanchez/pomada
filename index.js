var kueService=require('./services/queue/bullService')
kueService.createJob({
  title: 'ola ke ase',play: 'site.yml' , role: 'utils'
});

/**
queue.process('provision', function(job, done){
  runProvision(job.data, done);
});

function runProvision(address, done) {


    //return done(new Error('invalid to address'));
  console.log ("consumido");

  done();
}
**/
