var express = require("express");
var router = express.Router();
const {poolPromise} = require('../config/db');



var {ssh} = require('../config/ssh');

var dockerHost = require('../config/docker');

var data_access = require('../data_access/data_interface');


/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

//Upload a widget to the Gallery
router.post("/post-widget", async function(req, res, next) {
  data_access.postWidget(req.body)
  .then(result=>{
    dockerHost.pull(req.body.docker,(err,mystream)=>{
      mystream.pipe(process.stdout);
    });
    res.json(result);
  }).catch(err=>{
    console.log(err);
  });
});

//Get widgets to display in gallery
router.get("/get-widgets",async function(req, res, next) {
  data_access.getWidgets()
  .then(response=>{
    res.json(response);
  }).catch(err=>{
    console.log(err);
  });  
});

//Save widget to personal widget tray
router.post("/save-widget",async function(req, res, next) {
  data_access.postWidget(req.body)
  .then(response=>{
    res.send(response);
  }).catch(err=>{
    console.log(err);
  });
});

//Get widgets saved to tray
router.get("/get-saved-widgets", async function(req, res, next) {

  data_access.getSavedWidgets()
  .then(response=>{
    console.log(response);
    res.json(response);
  }).catch(err=>{
    console.log(err);
  });  
});

//Save dashboard to reuse later
router.post("/save-dashboard", function(req, res, next) {});

//Re-load saved dashboard
router.get("/load-dashboard", function(req, res, next) {});

//Download dashboard to use offline
router.get("/download-dashboard", function(req, res, next) {});

router.get("/get-widget-url/",function(req,res,next){
  var containerName = req.query.name;
  
  var options = {
    all:true,limit:1,filters:{name:[containerName]}
  }
  //console.log(options);
  dockerHost.listContainers(options,(err,containers)=>{
    if(err){
      throw err;
    }
    var containerData;
    if(containers.length>0){
      containerData = containers[0];
      if(containerData.State === "running"){

      }
      else{
        console.log("not running,lets boot her up!");
        var container = dockerHost.getContainer(containerData.Id);
        container.start({},(err,data)=>{
          console.log(data);
        });
      }
    }
    else{
      var splitNames = containerName.split(/[:/]/);
     /* dockerHost.run(containerName,[],process.stdout,{Image:containerName,name:splitNames[1],ExposedPorts:{'3838/tcp':{}},HostConfig:{
        PortBindings:{'3838/tcp':[{'HostPort':''}]}
      }})
      .then(function(container){
        console.log(container.output.StatusCode);
      }).catch(function(err){
        console.log(err);
      });*/
      
      var startOptions = {
        PortBindings:{'3838/tcp':[{'HostPort':''}]}
      }

      var container = dockerHost.createContainer({
        Image:containerName,
        name:splitNames[1],
        Tty:true,
        ExposedPorts:{'3838/tcp':{}},
        HostConfig:{
          PortBindings:{'3838/tcp':[{'HostPort':''}]
        }
        }
      }).then(container=>{
        return container.start();
      }).then(container=>{
        container.inspect((err,data)=>{
          res.send(data.NetworkSettings.Ports["3838/tcp"][0].HostPort);
        });
      });
    }

    
    
    res.send(containers);
  });
});

router.get("/tests", async function(req, res, next) {

  var container = dockerHost.getContainer('datras-qc-length-weight'); 
  container.inspect((err,data)=>{
    res.send();
  })
});

module.exports = router;
