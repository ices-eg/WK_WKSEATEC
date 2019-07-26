var sql_access = require('../data_access/sql_access');
var json_access = require('../data_access/json_access')
var config = require('./config_reader');
const path = require('path');
const filepath =path.normalize(process.cwd()+'/dashboard/data.json');


//based on our config return a different data access method, e.g sql for online JSON file for offline

async function getWidgets() {
    /**TODO check config file and return different function
      *based on where app is running,for now lets return or
      *sql function
     *S*/
    if (config.config.isOffline) {
        return json_access.getWidgets(filepath);
    } else {
        return sql_access.getWidgets();
    }
}

async function getSavedWidgets() {
    if (config.config.isOffline) {
        return json_access.getSavedWidgets(filepath);
    } else {
        return sql_access.getSavedWidgets();
    }
}

async function postWidget(body) {
    if (config.config.isOffline) {
        return json_access.postWidget(filepath);
    } else {
        return sql_access.postWidget(body);
    }
}

async function saveWidget(body) {
    if (config.config.isOffline) {
        return json_access.saveWidget(filepath);
    } else {
        return sql_access.saveWidget(body);
    }
}

async function loadDashboard(){
    if(config.config.isOffline){
        return json_access.loadDashboard(filepath);
    }
    else{
        console.log("Must be offline to load a dashboard");//in future we will save dashboards online too
       return sql_access.loadDashboard();
    }
}

module.exports = {
    getWidgets, getSavedWidgets, postWidget, saveWidget,loadDashboard
}