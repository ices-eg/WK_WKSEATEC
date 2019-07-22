let Docker = require('dockerode');
let dns = require('dns');
var config =require('../data_access/config_reader');
let isWindows = process.platform === "win32";

let options = {};

/*dns.lookup('host.docker.internal',function(err,addresses,family){
    console.log(addresses);
})*/
console.log(process.env.HOST);

if (isWindows) {
    options = {
        protocol: 'http', host: '127.0.0.1', port: '2375'
    }
    console.log(options);
} else if(!config.config.isOffline){
    options = {
        socketPath: '/var/run/docker.sock'
    }
    console.log(options);
}else{
    dns.lookup('host.docker.internal',(err,addresses,family)=>{
        if(err){
            console.log(err);
        }
        options = {
            protocol: 'http', host: addresses, port: '2375'
        }
        console.log(addresses);
        console.log(family);
    })
    
    console.log(options);
}

module.exports = new Docker(options);