var express = require("express");
var router = express.Router();

var dockerHost = require('../config/docker');

var data_access = require('../data_access/data_interface');

const reachable = require('is-reachable');

const path = require('path');

const fs = require('fs');

var HOST = process.env.HOST;

const JSZip = require('jszip');

function sleep(ms){
  return new Promise(resolve=>{
    setTimeout(resolve,ms);
  })
}

async function checkReach(url,ms){
  var isReachable = await reachable(url);
  if(!isReachable){
    setTimeout(checkReach,ms);
  }
  else{
    return true;
  }
}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

//Upload a widget to the Gallery
router.post("/api/post-widget", async function (req, res, next) {
  data_access.postWidget(req.body)
    .then(result => {
      dockerHost.pull(req.body.docker, (err, mystream) => {
        mystream.pipe(process.stdout);
      });
      res.json(result);
    }).catch(err => {
      console.log(err);
    });
});

//Get widgets to display in gallery
router.get("/api/get-widgets", async function (req, res, next) {
  data_access.getWidgets()
    .then(response => {
      res.json(response);
    }).catch(err => {
      console.log(err);
    });
});

//Save widget to personal widget tray
router.post("/api/save-widget", async function (req, res, next) {
  data_access.saveWidget(req.body)
    .then(response => {
      res.send(response);
    }).catch(err => {
      console.log(err);
    });
});

//Get widgets saved to tray
router.get("/api/get-saved-widgets", async function (req, res, next) {

  data_access.getSavedWidgets()
    .then(response => {
      console.log(response);
      res.json(response);
    }).catch(err => {
      console.log(err);
    });
});

//Save dashboard to reuse later
router.post("/api/save-dashboard", function (req, res, next) { 
  var jsonData = req.body;
  var stringData = JSON.stringify(jsonData);
  var filePath = path.normalize('/usr/src/app/public/test.json');
    /* fs.writeFile(filePath,stringData, 'utf8',function(err){
      console.log(filePath);
      if(err){
        console.log(err);
        res.status(404).send('File not saved');
        return;
      }else{
        res.sendFile(filePath);
      }
    }); */

    var configData = fs.readFileSync(process.cwd()+'/public/config/config.json','utf8');
    var composeData = fs.readFileSync(process.cwd()+'/public/compose/docker-compose.yml','utf8');

    var zip = new JSZip();
    zip.file("docker-compose.yml",composeData)
    var dataFolder = zip.folder("data");
    //dataFolder.file(); add sample data,TODO
    var configFolder = zip.folder("config");
    configFolder.file("config.json",configData);

    zip.generateAsync({type:'nodebuffer'}).then((content)=>{
      res.sendFile(content);
    })
});

//Re-load saved dashboard
router.get("/api/load-dashboard", function (req, res, next) { });

//Download dashboard to use offline
router.get("/api/download-dashboard", function (req, res, next) { });

router.get("/api/get-widget-url/", function (req, res, next) {
  var containerName = req.query.name;
  var splitNames = containerName.split(/[:/]/);
  var name = splitNames[1];
  var rootURL = 'http://'+process.env.HOST+":";

  var options = {
    all: true, limit: 1, filters: { name: [name] }
  }
  //console.log(options);
  dockerHost.listContainers(options, (err, containers) => {
    if (err) {
      throw err;
    }
    console.log(containers);
    var containerData;
    //Does a container exist for this image?
    if (containers.length > 0) {
      containerData = containers[0];
      //Is the container running already?
      if (containerData.State === "running") {
        var container = dockerHost.getContainer(containerData.Id);
        container.inspect((err, data) => {
          var port = data.NetworkSettings.Ports["3838/tcp"][0].HostPort;
          console.log(rootURL+port);
          var url = rootURL+port;
          checkReach(url,100).then(bool=>{
              res.json({url:url});
          });
        }) 
      }
      else {//container isn't running
        console.log("not running,lets boot her up!");
        var container = dockerHost.getContainer(containerData.Id);
        container.start({}, (err, data) => {
          container.inspect((err, data) => {
            var port = data.NetworkSettings.Ports["3838/tcp"][0].HostPort;
            console.log(rootURL+port);
            var url = rootURL+port;
          checkReach(url,100).then(bool=>{
              res.json({url:url});
          });
          });
        });
      }
    }
    else {//container doesn't exist
      console.log("Container doesnt exist");
      var splitNames = containerName.split(/[:/]/);

      var container = dockerHost.createContainer({
        Image: containerName,
        name: splitNames[1],
        Tty: true,
        ExposedPorts: { '3838/tcp': {} },
        Volumes: { '/srv/shiny-server/data': {} },
        HostConfig: {
          Binds: ['/home/luigi/DatrasData/:/srv/shiny-server/data'],
          PortBindings: {
            '3838/tcp': [{ 'HostPort': '' }],
          }
        }
      }).then(container => {
        return container.start();
      }).then(container => {
        container.inspect((err, data) => {
          var port = data.NetworkSettings.Ports["3838/tcp"][0].HostPort;
          var url = rootURL+port;
          checkReach(url,100).then(bool=>{
              res.json({url:url});
          });
        });
      }).catch(err=>{
        console.log(req);
        console.log(err);
      })

    }
  }); 
});

router.get("/tests", async function (req, res, next) {
  res.send({"message":"Hi there!"});
});

module.exports = router;
