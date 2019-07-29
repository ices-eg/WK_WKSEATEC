var fs = require('fs');
const path = require('path');
const directory = path.normalize(process.cwd()+'/keys/keys.json');
var keys;
try{
let rawdata = fs.readFileSync(directory);
keys = JSON.parse(rawdata);
}
catch(err){
    console.log("dir:" + directory +"err:"+err);
}
module.exports ={
    SQLURI: keys.SQLURI
}