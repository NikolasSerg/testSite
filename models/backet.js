const fs = require("fs");
const path = require('path');
const colors = require('colors');

colors.setTheme({
  info: 'bgGreen',
  help: 'cyan',
  warn: 'yellow',
  success: 'bgBlue',
  error: 'red'
});

let backet = {
  save: async function (data) {
console.log(data, ' - data'.error); //object

    let dataAll = await this.getAll(); //arr

    console.log(dataAll, ' - dataAll'.bgBlue);
    console.log(typeof dataAll, ' - typeof dataAll');

    let dataNew = await dataAll.filter(item => item.id !== data.id); //arr

    console.log(dataNew, ' - dataNew from DataAll'.info);

    dataNew.push(data);

    console.log(dataNew, ' - dataNew'.cyan);
    
      fs.writeFile(
        path.join(__dirname, '..', 'data', 'backet.json'),
        JSON.stringify(dataNew),
        (err) => {
          if(err) {
            console.error(err);
          } else {
            console.log(data, ' - data');
          }
        }
      )
  },

  //  

  getAll: function () {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "backet.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            console.log(err);
            reject(err)
          } else {
            console.log("getAll done");
            resolve(JSON.parse(content))
          }
        }
      );
    });
  },

  getId: async function (id) {
    let data = await this.getAll();
    console.log(typeof data, ' - typeof data');
    return data.filter(item => item.id === id);
}
}
  
module.exports = backet;