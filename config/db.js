const key = require('./keys').SQLURI;
const sql = require('mssql');

const poolPromise = new  sql.ConnectionPool(key)
.connect()
.then(pool=>{
    console.log("SQL Connected")
    return(pool);
})
.catch(err=>console.log("No SQL connection",err))

module.exports ={
    sql,poolPromise
}