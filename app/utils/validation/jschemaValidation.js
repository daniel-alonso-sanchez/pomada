var validator = require('is-my-json-valid');
var logger = require('utils/logs/logger');
var ansibleSchema=require('./ansibleSchema.json');
var validate = validator(ansibleSchema);


function validateObject(data){   
  var valid = validate(data);    
  if (!valid){      
     logger.debug (validate.errors);
  }  
  return valid;
};
module.exports = {
    validate: validateObject,
	jsonSchema: ansibleSchema
}
