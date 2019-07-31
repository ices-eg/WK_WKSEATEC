var express = require("express");
var router = express.Router();

var dockerHost = require("../config/docker");

var data_access = require("../data_access/data_interface");

const reachable = require("is-reachable");

const path = require("path");

const fs = require("fs");

let dns = require('dns-sync');

var HOST = process.env.HOST;

var DIR = process.env.DIR;

var dataDir = path.normalize(DIR + "/data");

const hbs = require("handlebars");
const config = require("../data_access/config_reader");

console.log(dataDir);

const Archiver = require("archiver");


async function checkReach(url, ms) {
  /**
   * tries to reach url every specified number of milliseconds until url is successfully reached
   */

  var isReachable = await reachable(url);
  if (!isReachable) {
    setTimeout(checkReach, ms);
  } else {
    return true;
  }
}

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

//Upload a widget to the Gallery
router.post("/api/post-widget", async function(req, res, next) {
  data_access
    .postWidget(req.body)
    .then(result => {
      dockerHost.pull(req.body.docker, (err, mystream) => {
        mystream.pipe(process.stdout);
      });
      res.json(result);
    })
    .catch(err => {
      console.log(err);
    });
});

//Get widgets to display in gallery
router.get("/api/get-widgets", async function(req, res, next) {
  data_access
    .getWidgets()
    .then(response => {
      console.log(response);
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

//Save widget to personal widget tray
router.post("/api/save-widget", async function(req, res, next) {
  data_access
    .saveWidget(req.body)
    .then(response => {
      res.send(response);
    })
    .catch(err => {
      console.log(err);
    });
});

//Get widgets saved to tray
router.get("/api/get-saved-widgets", async function(req, res, next) {
  data_access
    .getSavedWidgets()
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      console.log(err);
    });
});

//Save dashboard to reuse later
router.post("/api/save-dashboard", function(req, res, next) {
  //save the posted JSON to a text file
  var jsonData = req.body;
  var data = {
    widgets: jsonData
  };
  var stringData = JSON.stringify(data);

  var zip = Archiver("zip");

  //compile our docker-compose template based on the posted widgets
  const composeTemplate = hbs.compile(
    fs
      .readFileSync(
        path.normalize(process.cwd() + "/public/compose/docker-compose.hbs")
      )
      .toString("utf-8")
  );
  //format our widgets so that they can be used with the template, we only want our widgets not the draggable's properties(e.g size, position etc)
  var handlebarsData = { images: [] };
  for (var i = 0; i < data.widgets.length; i++) {
    var ourWidget = data.widgets[i].widget;
    var splitNames = ourWidget.docker.split(/[:/]/);
    var name = splitNames[1];
    var insert = { name: name, image: ourWidget.docker };
    handlebarsData.images.push(insert);
  }
  console.log(handlebarsData);

  var composeData = composeTemplate(handlebarsData);

  //zip all our required offline files
  zip.pipe(res);

  zip
    .file(path.normalize(process.cwd() + "/public/config/config.json"), {
      name: "config/config.json"
    })
    .append(composeData, { name: "docker-compose.yml" })
    .file(path.normalize(process.cwd() + "/public/batch/start_gallery.bat"), {
      name: "start_gallery.bat"
    })
    .file(path.normalize(process.cwd() + "/data/myFilters.csv"), {
      name: "data/myFilters.csv"
    })
    .file(path.normalize(process.cwd() + "/data/filteredData.rds"), {
      name: "data/filteredData.rds"
    })
    .file(path.normalize(process.cwd() + "/data/Exchange.zip"), {
      name: "data/Exchange.zip"
    })
    .file(path.normalize(process.cwd() + "/data/DATRAS_Exchange_Data.csv"), {
      name: "data/DATRAS_Exchange_Data.csv"
    })
    .append(stringData, { name: "dashboard/data.json" })
    .finalize();
});

//Re-load saved dashboard
router.get("/api/load-dashboard", async function(req, res, next) {
  data_access
    .loadDashboard()
    .then(async response => {
      //we use Promises here to ensure our loop completes before we return the response
      var promiseArray = [];
      response.forEach(widget => {
        var rootURL = dns.resolve('host.docker.internal');
        var containerName = widget.widget.docker;
        var splitNames = containerName.split(/[:/]/);
        var name = splitNames[1];

        var options = {
          all: true,
          limit: 1,
          filters: { name: [name] }
        };
        //we push our widget Promise to the promise array
        promiseArray.push(
          new Promise((resolve, reject) => {
            dockerHost.listContainers(options, (err, containers) => {
              if (err) {
                console.log(err);
              }

              var containerData;
              if (containers.length > 0) {
                containerData = containers[0];
                var container = dockerHost.getContainer(containerData.Id);
                container.inspect((err, data) => {
                  var port = data.NetworkSettings.Ports["3838/tcp"][0].HostPort;
                  console.log(rootURL + port);
                  var url = rootURL +":"+ port;
                  widget.widget.widgetURL = url;
                  checkReach(url, 10).then(bool => {
                    console.log(bool);
                    resolve(widget);
                  });
                });
              }
            });
          })
        );
      });
      console.log(response);
      //we resolve our promises and return the array of view widgets to the frontend
      res.send(await Promise.all(promiseArray));
    })
    .catch(err => {
      console.log(err);
    });
});

//Download dashboard to use offline
router.get("/api/download-dashboard", function(req, res, next) {});

router.get("/api/get-widget-url/", function(req, res, next) {
  //format the widgets docker name so that we can find/create the container
  var containerName = req.query.name;
  var splitNames = containerName.split(/[:/]/);
  var name = splitNames[1];
  var rootURL = "";
  //set the root of the url depending on whether we're running offline or online
  if (config.config.isOffline) {
    //host.docker.internal resolves to the local ip of our host machine from within the container
    rootURL = "http://host.docker.internal" + ":";
  } else {
    rootURL = "http://" + process.env.HOST + ":";
  }

  //set our search options for the current container
  var options = {
    all: true,
    limit: 1,
    filters: { name: [name] }
  };
  //list all containers given our above options
  dockerHost.listContainers(options, (err, containers) => {
    if (err) {
      console.log(err);
      console.log("Can't find image with that name");
    }
    var containerData;
    //Does a container exist for this image?
    if (containers.length > 0) {
      containerData = containers[0];
      //Is the container running already?
      if (containerData.State === "running") {
        var container = dockerHost.getContainer(containerData.Id);
        //retrieve the host port of the container
        container.inspect((err, data) => {
          var port = data.NetworkSettings.Ports["3838/tcp"][0].HostPort;
          console.log(rootURL + port);
          var url = rootURL + port;
          //ensure container has fully running before we return URL
          checkReach(url, 100).then(bool => {
            res.json({ url: url });
          });
        });
      } else {
        //container isn't running
        console.log("not running,lets boot her up!");
        var container = dockerHost.getContainer(containerData.Id);
        //start up the container
        container.start({}, (err, data) => {
          //again retrieve the port on the host and wait til container is fully started before returning the URL
          container.inspect((err, data) => {
            var port = data.NetworkSettings.Ports["3838/tcp"][0].HostPort;
            console.log(rootURL + port);
            var url = rootURL + port;
            checkReach(url, 100).then(bool => {
              res.json({ url: url });
            });
          });
        });
      }
    } else {
      //container doesn't exist
      console.log("Container doesnt exist");
      var splitNames = containerName.split(/[:/]/);
      console.log(splitNames);
      //create our container with the necessary exposed ports, mounted volumes and then start it, retrieve it's port and return the URL
      var container = dockerHost
        .createContainer({
          Image: containerName,
          name: splitNames[1],
          Tty: true,
          ExposedPorts: { "3838/tcp": {} },
          Volumes: { "/srv/shiny-server/data": {} },
          HostConfig: {
            Binds: [dataDir + ":/srv/shiny-server/data"],
            PortBindings: {
              "3838/tcp": [{ HostPort: "" }]
            }
          }
        })
        .then(container => {
          //start our container once created
          return container.start();
        })
        .then(container => {
          container.inspect((err, data) => {
            var port = data.NetworkSettings.Ports["3838/tcp"][0].HostPort;
            var url = rootURL + port;
            checkReach(url, 100).then(bool => {
              res.json({ url: url });
            });
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  });
});

router.get("/tests", async function(req, res, next) {
  res.send({ message: "Hi there!" });
});

module.exports = router;
