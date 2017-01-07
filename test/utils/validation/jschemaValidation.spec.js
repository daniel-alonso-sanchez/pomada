var path=require('path');
var assert = require('chai').assert

const jsonToValidate = {
       
       
         "title": "utils provisioning",
         "to": "daIp",
         "tags": "packaging",
         "atts":{
         }
       
};
const jvalidation =  require('utils/validation/jschemaValidation');

describe('validates json request against schema', function () {
  it('validates sucessfully', function * () {    
    var result=jvalidation.validate(jsonToValidate);
    assert.isTrue(result, 'data ok');    
  })
});
describe('test -title- field is required', function () {
  it('return false because title is mandatory', function * () {   
    delete jsonToValidate.title; 
    var result=jvalidation.validate(jsonToValidate);
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test -to- field is required', function () {
  it('return false because to is mandatory', function * () {   
    delete jsonToValidate.to; 
    var result=jvalidation.validate(jsonToValidate);
    assert.isNotTrue(result, 'data not ok');    
  })
});
describe('test null null check', function () {
  it('return false because object is required', function * () {      
    var result=jvalidation.validate(null);
    assert.isNotTrue(result, 'data not ok');    
  })
})
