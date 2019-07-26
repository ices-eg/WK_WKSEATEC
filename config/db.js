const key = require('./keys').SQLURI;
const sql = require('mssql');

/**
 * Create our connection to the sql server
 * Pool promises prevent errors when making concurrent queries
 * Each query waits until the previous one has completed
 */
const poolPromise = new sql.ConnectionPool(key)
    .connect()
    .then(pool => {
        console.log("SQL Connected")
        return (pool);
    })
    .catch(err => console.log("No SQL connection", err))

module.exports = {
    sql, poolPromise
}