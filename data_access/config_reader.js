var fs = require('fs');
const path = require('path');

var config;
const directory = path.normalize(process.cwd()+'/config/config.json');
let rawdata = fs.readFileSync(directory);
config = JSON.parse(rawdata);
module.exports={
    config
}


   