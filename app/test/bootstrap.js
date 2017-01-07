var path= require('path');
console.log(path.resolve());
require ('app-module-path').addPath(path.resolve()+'/app');
console.log("hi");
