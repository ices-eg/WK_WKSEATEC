var sql_access = require('../data_access/sql_access');

async function getWidgets() {
    /**TODO check config file and return different function
      *based on where app is running,for now lets return or
      *sql function
     *S*/
    return sql_access.getWidgets();
}

async function getSavedWidgets() {
    return sql_access.getSavedWidgets();
}

async function postWidget(body) {
    return sql_access.postWidget(body);
}

async function saveWidget(body) {
    return sql_access.saveWidget(body);
}

module.exports = {
    getWidgets, getSavedWidgets, postWidget, saveWidget
}