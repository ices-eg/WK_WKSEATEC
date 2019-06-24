const key = require('./keys').SQLURI;
const sql = require('mssql');

const poolPromise = new  sql.ConnectionPool(key)
.connect()
.then(pool=>{
    console.log("Connected")
    return(pool);
})
.catch(err=>console.log("Connection failed!",err))

module.exports ={
    sql,poolPromise
}