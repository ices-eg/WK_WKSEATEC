var express = require("express");
var router = express.Router();
var key = require('../config/keys').SQLURI;
const {poolPromise} = require('../config/db');

const imageEndpoint = '/blob/master/Screenshot.png?raw=true';

var node_ssh = require('node-ssh');
var ssh = new node_ssh();
var Docker = require('dockerode');
var docker = new Docker({host:'10.11.1.70',port:'22',});


/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

//Upload a widget to the Gallery
router.post("/post-widget", async function(req, res, next) {
  try{
    const pool =  await poolPromise;
    const result = await pool.request()
      .input('name',sql.VarChar,req.body.name)
      .input('docker',req.body.docker)
      .input('github',req.body.github)
      .input('author',req.body.author)
      .input('imageURL',imgUrl)
      .query("insert into Widgets (name,docker,github,author,imageURL) values (@name,@docker,@github,@author,@imageURL)");
      res.json(result.recordset);
  }
  catch(err){
    res.status(500);
    res.send(err.Message);
  }
});

//Get widgets to display in gallery
router.get("/get-widgets",async function(req, res, next) {
  try{
    const pool =  await poolPromise;
    const result = await pool.request()
      .query("select * from Widgets");
      res.json(result.recordset);
  }
  catch(err){
    res.status(500);
    res.send(err.Message);
  }
});

//Save widget to personal widget tray
router.post("/save-widget",async function(req, res, next) {
  var id = req.body.id;

  try{
    const pool =  await poolPromise;
    const result = await pool.request()
      .input('id',id)
      .query('insert into Saved (WidgetID) values(@id)');
      res.json(result.recordset);
  }
  catch(err){
    res.status(500);
    res.send(err.Message);
  }

});

//Get widgets saved to tray
router.get("/get-saved-widgets", async function(req, res, next) {

  try{
    const pool =  await poolPromise;
    const result = await pool.request()
      .query('select * from Widgets INNER JOIN Saved ON Widgets.id = Saved.WidgetID');
      res.json(result.recordset);
  }
  catch(err){
    res.status(500);
    res.send(err.Message);
  }
});

//Save dashboard to reuse later
router.post("/save-dashboard", function(req, res, next) {});

//Re-load saved dashboard
router.get("/load-dashboard", function(req, res, next) {});

//Download dashboard to use offline
router.get("/download-dashboard", function(req, res, next) {});

router.get("/tests", async function(req, res, next) {

 /* ssh.connect({
    host:'10.11.1.70',
    username:'***REMOVED***',
    password:'***REMOVED***'
  }).then(function(){
    ssh.execCommand('docker ps').then(function(result){
      console.log(result);
    });

  });*/

 /* var container = docker.getContainer('a829a477f0a0');
  container.inspect(function(err,data){
    console.log(data);
  })*/
  try{
    const pool =  await poolPromise;
    const result = await pool.request()
      .query('select * from Widgets');
      res.json(result.recordset);
  }
  catch(err){
    res.status(500);
    res.send(err.Message);
  }
});

module.exports = router;
