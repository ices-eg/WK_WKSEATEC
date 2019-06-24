var express = require("express");
var router = express.Router();
var db = require('../config/keys').SQLURI;
var sql = require('mssql');
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
router.post("/post-widget", function(req, res, next) {
  console.log(req.body);
  sql.connect(db, function(err) {
    if (err) console.log(err);
    console.log("Connected");

    var imgUrl = req.body.github +imageEndpoint;
    console.log(imgUrl);

    var request = new sql.Request();
    request.input('name',sql.VarChar,req.body.name);
    request.input('docker',req.body.docker);
    request.input('github',req.body.github);
    request.input('author',req.body.author);
    request.input('imageURL',imgUrl);
    request.query("insert into Widgets (name,docker,github,author,imageURL) values (@name,@docker,@github,@author,@imageURL)", function(err, result) {
      if(err){
        console.log(err);
        sql.close();
        res.send(err);
      } 
      sql.close();
      res.send(result);
    });
  });
});
//INSERT INTO Widgets (name,docker,github,author) VALUES($(req.body.name),$(req.body.author),$(req.body.github),$(req.body.docker))
//Get widgets to display in gallery
router.get("/get-widgets", function(req, res, next) {
  sql.connect(db,function(err){
    if(err){
      console.log(err);
    } 
    
    var request = new sql.Request();

    request.query("select * from Widgets", function(err, response) {
      if(err){
        console.log(err);
        sql.close();
        res.send(err);
      } 
      sql.close();
      console.log(response);
      res.send(response.recordset);
    });
  });
});

//Save widget to personal widget tray
router.post("/save-widget", function(req, res, next) {});

//Get widgets saved to tray
router.get("/get-saved-widgets", function(req, res, next) {});

//Save dashboard to reuse later
router.post("/save-dashboard", function(req, res, next) {});

//Re-load saved dashboard
router.get("/load-dashboard", function(req, res, next) {});

//Download dashboard to use offline
router.get("/download-dashboard", function(req, res, next) {});

router.get("/tests", function(req, res, next) {

  ssh.connect({
    host:'10.11.1.70',
    username:'***REMOVED***',
    password:'***REMOVED***'
  }).then(function(){
    ssh.execCommand('docker ps').then(function(result){
      console.log(result);
    });
  });



 /* var container = docker.getContainer('a829a477f0a0');
  container.inspect(function(err,data){
    console.log(data);
  })*/
});

module.exports = router;
