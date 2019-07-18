var sql_access = require('../data_access/sql_access');
var json_access = require('../data_access/json_access')
var config = require('./config_reader');
const path = require('path');
const filepath =path.normalize(process.cwd()+'/dashboard/data.json');


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

module.exports = {
    getWidgets, getSavedWidgets, postWidget, saveWidget
}