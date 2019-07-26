let Docker = require('dockerode');
let dns = require('dns-sync');
var config =require('../data_access/config_reader');
let isWindows = process.platform === "win32";

let options = {};
console.log(process.env.HOST);

//based on our current config, return the connection to the docker REST api
if (isWindows) {
    options = {
        protocol: 'http', host: '127.0.0.1', port: '2375'
    }
    console.log(options);
} else if(!config.config.isOffline){
    //our server runs on linux so we point it towards the docker daemon directory
    options = {
        socketPath: '/var/run/docker.sock'
    }
    console.log(options);
}else{
    //resolve the DNS before setting the value as Dockerode doesn't seem to like DNS 
    options = {
        protocol: 'http', host: dns.resolve('host.docker.internal'), port: '2375'
    }
    console.log(options);
}

console.log(options);
module.exports = new Docker(options);