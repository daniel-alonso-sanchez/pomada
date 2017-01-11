var path=require('path');
var assert = require('chai').assert

const jsonToValidate = {
       
       
         "title": "utils provisioning",
         "to": "daIp",
         "tags": "packaging",
         "vars":{
         }
       
};
const weblogicJsonVars = {
      "unit_name": "fw",
	  "datasources":[
		{
			"datasource":{
			   "name": "framework",
			   "targets": [
				"AdminServer"
			   ],
			   "driver_name": "oracle.jdbc.OracleDriver",
			   "url": "jdbc:oracle:thin:@caserd-scan:1525:APLD",
			   "user": "framework",
			   "password": "framework",
			   "test_query": "SQL SELECT 1 FROM DUAL",
			   "transaction_protocol": "TwoPhaseCommit",
			   "jndi_name": "frameworkDS"
			}
		}
	  ]
   };
const jvalidation =  require('utils/validation/jschemaValidation');

describe('validates json request against api schema', function () {
  it('validates sucessfully', function * () {    
    var testObject = JSON.parse(JSON.stringify(jsonToValidate));
    var result=jvalidation.validate(testObject);
    assert.isTrue(result, 'data ok');    
  })
});
describe('test -title- field is required in the api schema', function () {
  it('return false because title is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(jsonToValidate));
    delete testObject.title; 
    var result=jvalidation.validate(testObject);
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -to- field is required in the api schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(jsonToValidate));
    delete testObject.to; 
    var result=jvalidation.validate(testObject);
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test null null check in the api schema', function () {
  it('return false because object is required', function * () {      
    var result=jvalidation.validate(null);
    assert.isNotTrue(result, 'data not ok');    
  })
})
describe('when a new property is added to the api schema', function () {
  it('return false because only defined properties are valid', function * () {   
    var testObject = JSON.parse(JSON.stringify(jsonToValidate));  
    testObject.ppp={};
    var result=jvalidation.validate(testObject);
    assert.isNotTrue(result, 'data not ok');    
  })
});

describe('validates json request against weblogic schema', function () {
  it('validates sucessfully', function * () {    
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));
    var result=jvalidation.validate(testObject,'weblogic');
    assert.isTrue(result, 'data ok');    
  })
});
describe('test -unit_name- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));
    delete testObject.unit_name; 
    var result=jvalidation.validate(testObject);
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -datasources- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));
    delete testObject.datasources; 
    var result=jvalidation.validate(testObject);
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -datasource.name- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));	
    delete testObject.datasources[0].datasource.name; 	
    var result=jvalidation.validate(testObject);	
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -datasource.targets- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));	
    delete testObject.datasources[0].datasource.targets; 	
    var result=jvalidation.validate(testObject);	
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -datasource.driver_name- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));	
    delete testObject.datasources[0].datasource.driver_name; 	
    var result=jvalidation.validate(testObject);	
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -datasource.url- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));	
    delete testObject.datasources[0].datasource.url; 	
    var result=jvalidation.validate(testObject);	
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -datasource.user- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));	
    delete testObject.datasources[0].datasource.user; 	
    var result=jvalidation.validate(testObject);	
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -datasource.password- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));	
    delete testObject.datasources[0].datasource.password; 	
    var result=jvalidation.validate(testObject);	
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -datasource.test_query- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));	
    delete testObject.datasources[0].datasource.test_query; 	
    var result=jvalidation.validate(testObject);	
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -datasource.transaction_protocol- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));	
    delete testObject.datasources[0].datasource.transaction_protocol; 	
    var result=jvalidation.validate(testObject);	
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -datasource.jndi_name- field is required in the weblogic schema', function () {
  it('return false because to is mandatory', function * () {   
    var testObject = JSON.parse(JSON.stringify(weblogicJsonVars));	
    delete testObject.datasources[0].datasource.jndi_name; 	
    var result=jvalidation.validate(testObject);	
    assert.isNotTrue(result, 'data not ok');    
  })
});