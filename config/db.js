const key = require('./keys').SQLURI;
const sql = require('mssql');

//create our connection to the sql server
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