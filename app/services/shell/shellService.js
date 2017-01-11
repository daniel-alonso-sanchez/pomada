var logger = require('utils/logs/logger');
var spawn = require('child_process').spawn;
var config= require ('config');
var StringDecoder = require('string_decoder').StringDecoder;
var validation= require('utils/validation/jschemaValidation');
var has = require('lodash.has');
function runCommand(job,doneCallback){
  logger.debug("getting parameters... ");
  var parameters= getParameters (job); 
  logger.debug("before running shell command... ");
  var child = spawn('ansible-playbook', parameters,{cwd: config.get("app").playbook.path }, {stdio: "inherit"});
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
        if (code!==0){
				logger.error('Job %d exited with code %d. Details: %s', job.id, code, JSON.stringify(job));
                throw new Error( 'job ends with code: '+ code );
        }
        doneCallback();
  });

  // or if you want to send output elsewhere
  //child.stdout.pipe(dest);
};
function checkTargets(machineList){
	logger.debug("checkTargets... ");
	var reIP = /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3})$|^((([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9\-]*[a-zA-Z0-9])\.)*([A-Za-z0-9]|[A-Za-z0-9][A-Za-z0-9\-]*[A-Za-z0-9]))$/,
    tokens = machineList.split(/\s*,\s*/), i;
	
	for (i = 0; i < tokens.length; i++){
		if (!reIP.test(tokens[i])){
			 logger.error("Ip address not valid: " +tokens[i]);
			 throw new Error( 'Ip address not valid : '+ tokens[i] );
		}
	}
	logger.debug("end checkTargets... ");
	return machineList;
}
function getRule(requestedRule){
	var rule="site.yml";
	logger.debug("getRule... "+requestedRule);
	if (requestedRule && requestedRule.length>0){		
		rule=requestedRule;
	}
	logger.debug("end getRule... ");
	return rule;
}
function getParameters(job){
	var parameters=['-i',checkTargets(job.data.to),getRule(job.data.rule)];
	var hasProperty=has(job.data, 'tags');
	logger.debug('hasProperty:'+hasProperty);
	if (hasProperty && job.data.tags.length>0){		
		parameters=parameters.concat (['--tags',job.data.tags]);	
	}
	parameters=parameters.concat(getExtraVars(job));
	logger.debug('parameters:'+parameters);
	return parameters;
}
function getExtraVars(job){
	var parameters=[];
	var hasProperty=has(job.data, 'tags');
	var extraVarsStr='';
	if (hasProperty && job.data.tags.length>0){		
		var tags=job.data.tags.split(',');
		for (i=0;i<tags.length;i++){
			var currentTag=tags[i];
			var currentVarsStr=getExtraVarsForTag(job,currentTag);
		}
	}   
}
function getExtraVarsForTag(job,tag){	
	var hasProperty=has(job.data, 'vars');
	var extraVarsStr='';
	if (hasProperty && job.data.vars.length>0){		
		hasProperty=has(job.data.vars, tag);
		if (hasProperty && job.data.vars[tag].length>0){		
			/**ahora es cuando validamos el esquema de los datos suministrados**/
			validateMetadata(job,tag);
		}   
	}   
}
function validateMetadata(job,tag) {

 if (!validation.validate(job.data.vars[tag],tag)){
    logger.error ('Job %d json metadata is not valid. Must match this json schema: %s',job.id,JSON.stringify(validation.getSchema(tag)));
    throw new Error( 'Json request is not valid. Must match this json schema: '+JSON.stringify(validation.getSchema(tag)) );
 }
}
module.exports = {
    run: runCommand
}
