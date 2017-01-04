var spawn = require('child_process').spawn;
var StringDecoder = require('string_decoder').StringDecoder;
function runCommand(job,doneCallback){
  var child = spawn('node', ['-v'],{shell:true });
  var decoder = new StringDecoder('utf8');
  child.stdout.on('data', function(chunk) {
    // output will be here in chunks
    var textChunk = decoder.write(chunk);
	job.log (textChunk);
  });
  child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
    doneCallback();
  });
  // or if you want to send output elsewhere
  //child.stdout.pipe(dest);
};
module.exports = {
    run: runCommand
}
