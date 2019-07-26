var {poolPromise}= require('../config/db');

const imageEndpoint = '/blob/master/Screenshot.png?raw=true';

async function getWidgets(){
    //Pool promises help when we are doing concurrent requests to the database
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
    //return an empty array when we try and load a dashboard from the sql access, in the future we will also save dashboards online
    var empty = {widgets:[]};
    return empty.widgets;
}

module.exports ={
    getWidgets,getSavedWidgets,postWidget,saveWidget, loadDashboard
}