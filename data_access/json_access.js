const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);



async function getWidgets(path) {
   try {
      let content = await readFile(path);
      console.log(content);
      let data = JSON.parse(content);
      console.log(data);
      return data.widgets.widget;
   } catch (e) {
      console.log(e);
   }

   /* fs.readFile(path),(err,data)=>{
      if(err) throw err;
      let  res = JSON.parse(data);
      return res.widgets.widget;
   } */
}

async function getSavedWidgets(path) {
   try {
      let content = await readFile(path);
      console.log(content);
      let data = JSON.parse(content);
      console.log(data);
      return data.widgets.widget;
   } catch (e) {
      console.log(e);
   }
   /* fs.readFile(path), (err, data) => {
      if (err) throw err;
      let res = JSON.parse(data);
      return res.widgets.widget;
   } */
}

async function postWidget(path) {
   let content = await readFile(path).then(res => console.log(res))
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

module.exports = {
   getWidgets, getSavedWidgets, postWidget, saveWidget
}

