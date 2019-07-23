var {poolPromise}= require('../config/db');

const imageEndpoint = '/blob/master/Screenshot.png?raw=true';

async function getWidgets(){
    try{
        const pool = await poolPromise;
        const result = await pool.request()
        .query("select * from Widgets");
        return result.recordset;
    }
    catch(err){
        throw err;
    }
}

async function getSavedWidgets(){
    try{
        const pool = await poolPromise;
        const result = await pool.request()
        .query('select * from Widgets INNER JOIN Saved ON Widgets.id = Saved.WidgetID')
        return result.recordset;
    }catch(err){
        throw err;
    }
}

async function postWidget(body){
    try{
        var imgUrl = body.github + imageEndpoint;
        const pool =  await poolPromise;
        const result = await pool.request()
          .input('name',body.name)
          .input('docker',body.docker)
          .input('github',body.github)
          .input('author',body.author)
          .input('imageURL',imgUrl)
          .query("insert into Widgets (name,docker,github,author,imageURL) values (@name,@docker,@github,@author,@imageURL)");
     
         
          return result.recordset;
      }
      catch(err){
        throw err;
      }
}

async function saveWidget(body){
 var id = body.id;
 try{
     const pool = await poolPromise;
     const result = await pool.request()
     .input('id',id)
     .query('insert into Saved (WidgetID) values(@id)');

     return result.recordset;
 }catch(err){
     throw err;
 }
}

async function loadDashboard(){
    var empty = {widgets:[]};
    return empty.widgets;
}

module.exports ={
    getWidgets,getSavedWidgets,postWidget,saveWidget, loadDashboard
}