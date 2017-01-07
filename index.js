require('app-module-path').addPath(__dirname+'/app');
var service = require('services/queue/bullService');
var figlet = require('figlet');
var colors = require('colors');
var appPackage = require('./package.json');
 
figlet(appPackage.name.toUpperCase(), function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data.green);
	console.log("-Configuración de equipos de desarrollo automatizado-".yellow);
});
