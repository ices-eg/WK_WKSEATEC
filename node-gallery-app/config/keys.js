var fs = require('fs');
const path = require('path');
const isOffline = require('../data_access/config_reader').config.isOffline;
const directory = path.normalize(process.cwd()+'/keys/keys.json');
var keys = {};
if(!isOffline){
    try{
        let rawdata = fs.readFileSync(directory);
        keys = JSON.parse(rawdata);
        console.log(keys.SQLURI);
        }
        catch(err){
            console.log("dir:" + directory +"err:"+err);
        }
}

module.exports ={
    SQLURI: keys.SQLURI
}