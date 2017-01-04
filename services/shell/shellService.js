var spawn = require('child_process').spawn;
function runCommand(data,doneCallback){
  var child = spawn('node', ['-v'],{shell:true });
  child.stdout.on('data', function(chunk) {
    // output will be here in chunks
    console.log ("data:"+chunk);
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
