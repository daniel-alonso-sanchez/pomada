var path=require('path');
var assert = require('chai').assert
var rewire = require('rewire');
var shellService= rewire ('services/shell/shellService');

const jsonDict={
	"liferay":{
		"liferay_version": "6.2.4-ce-ga5"
	},
	"weblogic":{
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
		   }
};
function getJson(tags){
	var finalObject={
	   "id": 1234,
       "type": "ansible",
       "data": {
         "title": "utils provisioning",
         "to": "127.0.0.1",
         "tags": tags,
         "vars":{		 			
		 }
	   }
	};
	var tagArray=tags.split(',');
	for (i=0;i<tags.length;i++){
		var currentTag=tagArray[i];		
		finalObject.data.vars[currentTag]= jsonDict[currentTag];			
	}
	
	console.log(finalObject);
	return finalObject;
	
}
describe('calls getParameters with weblogic job', function () {
  it('should work', function * () {    
    var privateMethod = shellService.__get__('getParameters');
    var params=privateMethod (getJson('weblogic'));   
    assert.isTrue(params.length>0, 'ok');    
  })
});
describe('calls getParameters with liferay job', function () {
  it('should work', function * () {    
    var privateMethod = shellService.__get__('getParameters');		
    var params=privateMethod (getJson('liferay'));   
    assert.isTrue(params.length>0, 'ok');    
  })
});
describe('calls getParameters with complex job', function () {
  it('should work', function * () {    
    var privateMethod = shellService.__get__('getParameters');		
    var params=privateMethod (getJson('liferay,weblogic'));   
    assert.isTrue(params.length>0, 'ok');    
  })
});