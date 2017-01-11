var validator = require('is-my-json-valid');
var logger = require('utils/logs/logger');




function validateObject(data,schema){   
  var ansibleSchema;
  if (schema!=null){
	ansibleSchema=require('./'+schema+'.json');
  }
  else{
	ansibleSchema=require('./ansibleSchema.json');
  }
  var validate = validator(ansibleSchema);
  var valid = validate(data);    
  if (!valid){      
     logger.debug (validate.errors);
  }  
  return valid;
};
function getSchema(schema){   
  if (schema!=null){
	ansibleSchema=require('./'+schema+'.json');
  }  
  return ansibleSchema;
};
module.exports = {
    validate: validateObject,
	getSchema: getSchema
}
