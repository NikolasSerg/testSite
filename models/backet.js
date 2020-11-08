const fs = require("fs");
const path = require("path");
const colors = require("colors");

colors.setTheme({
  info: "bgGreen",
  help: "cyan",
  warn: "yellow",
  success: "bgBlue",
  error: "red",
});

let backet = {
  save: async function (data) {
    console.log(data, "  - data".error); //object
    let dataAll = await this.getAll(); //arr
    
    console.log(dataAll, ' - dataAll in model'.green);
    // console.log(dataAll.length, ' - dataAll.length'.red);
    // console.log(typeof dataAll, ' -typeof dataAll.length'.red);

    if (dataAll.length !== 0 || data !== "") {
      let inx = dataAll.indexOf(data.id);
      console.log(inx , ' - inx');
      dataAll[inx] = data;
      
      this.writeAll(dataAll);
    } else {
      this.writeAll(data);
    }
  },

  writeAll: function(data) {
    fs.writeFile(
      path.join(__dirname, "..", "data", "backet.json"),
      JSON.stringify(data),
      (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data, " - data");
        }
      }
    );
  },
 

  getAll: function () {
    return new Promise((resolve, reject) => {
      fs.readFile(
        path.join(__dirname, "..", "data", "backet.json"),
        "utf-8",
        (err, content) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log("getAll done");
            if(content === "") {
              console.log('JSON.parse(content) === ""');
              resolve("");
            } else {
              resolve(JSON.parse(content));
            }
            
          }
        }
      );
    });
  },

  getId: async function (id) {
    console.log(id, ' - id in backet');
    let data = await this.getAll();

    console.log(data.length, ' - data.length in GetID');
    console.log(data, ' - data GETID model'.blue);
    console.log(typeof data, " - typeof data GETID model");
    if(data === "") {
      return "";
    } else {
      return data.filter((item) => item.id === id);
    }
  },

  getSum: async function(data) {
    let sum;
    for(let i = data.length; i < data.length; i++) {
      console.log(data.price,' - data.price is for');
        sum = data.count * data.price;
        console.log(sum, ' - sum'); 
    };
    return sum;
  }
};

module.exports = backet;
