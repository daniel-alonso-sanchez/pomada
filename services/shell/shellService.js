var spawn = require('child_process').spawn;
var StringDecoder = require('string_decoder').StringDecoder;
function runCommand(job,doneCallback){
  var child = spawn('ansible-playbook', ['-i','windows',job.data.rule, '--tags','"'+job.data.tags+'"' ],{shell:true,cwd: "/datos/ansible/ansible-data/window_playbooks" });
  var decoder = new StringDecoder('utf8');
  child.stdout.on('data', function(chunk) {
    // output will be here in chunks
    var textChunk = decoder.write(chunk);
	job.log (textChunk);
  });
  child.stderr.on('data', function (chunk) {
	  var textChunk = decoder.write(chunk);
	  job.log (textChunk);
  });
  child.on('close', function (code) {
	console.log('child process exited with code ' + code);
	if (code!==0){
		throw new Error( 'job ends with code: '+ code );
	}
	doneCallback();
  });
  
  // or if you want to send output elsewhere
  //child.stdout.pipe(dest);
};
module.exports = {
    run: runCommand
}
