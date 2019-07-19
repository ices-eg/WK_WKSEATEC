var fs = require('fs');
const path = require('path');

var config;
const directory = path.normalize(process.cwd()+'/config/config.json');
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


   