var fs = require('fs');
const path = require('path');

//read and parse our JSON config file

var config;
const directory = path.normalize(process.cwd()+'/mounts/config/config.json');
try{
let rawdata = fs.readFileSync(directory);
config = JSON.parse(rawdata);
}
catch(err){
    console.log("dir:" + directory +"err:"+err);
}

module.exports={
    config
}


   