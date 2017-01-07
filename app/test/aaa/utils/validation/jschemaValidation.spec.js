const expect = require('chai').expect
const jsonToValidate = {
       "type": "ansible",
       "data": {
         "title": "utils provisioning",
         "to": "daIp",
         "tags": "packaging",
         "atts":{
         }
       }
};
const jvalidation =  require('app/utils/validation/jschemaValidation');
console.log("ola ke ase");
describe('The json schema validation', function () {
  it('validates sucessfully', function * () {    
    var result=jvalidation.validate(jsonToValidate);
    assertTrue(result);
  })
})
