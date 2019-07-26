const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);



async function getWidgets(path) {
   try {
      var widgets = [];
      let content = await readFile(path);
      let data = JSON.parse(content);
      //The JSON file needs to be formatted so we can return just the widgets and not the Draggables as well
      for(var i = 0;i<data.widgets.length;i++){
         widgets.push(data.widgets[i].widget);
      }
      var res = {widgets:widgets};
      return res.widgets;
   } catch (e) {
      console.log(e);
   }
}

//offline, saved widgets and regular widgets are the same thing
async function getSavedWidgets(path) {
   try {
      var widgets = [];
      let content = await readFile(path);
      let data = JSON.parse(content);
      for(var i = 0;i<data.widgets.length;i++){
         widgets.push(data.widgets[i].widget);
      }
      var res = {widgets:widgets};
      return res.widgets;
   } catch (e) {
      console.log(e);
   }
}
//can't post a widget while offline so we don't return anything
async function postWidget(path) {
   let content = await readFile(path,'utf8').then(res => console.log(res))
      .catch(err => console.log(err));
   let data = JSON.parse(content);
   console.log("Can't post while offline!");
}

async function saveWidget(path) {
   let content = await readFile(path).then(res => console.log(res))
      .catch(err => console.log(err));
   let data = JSON.parse(content);
   console.log("Can't save a widget when offline!");
}

async function loadDashboard(path){
   try{
      let content = await readFile(path);
      let data = JSON.parse(content);
      return data.widgets;
   }catch(err){
      console.log(e);
   }
}

module.exports = {
   getWidgets, getSavedWidgets, postWidget, saveWidget,loadDashboard
}

