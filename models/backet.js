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
    console.log(data, "  - data".green.bgMagenta); //object
    let dataAll = await this.getAll(); //arr
    
    console.log(dataAll, ' - dataAll in model'.green.bgMagenta);
    console.log(dataAll.length, ' - dataAll.length'.green.bgMagenta);
    // console.log(typeof dataAll, ' -typeof dataAll.length'.red);

    if (dataAll.length !== 0) {
      let inx = dataAll.findIndex( item => {item.id === data.id});
      console.log(inx , ' - inx');
      console.log(dataAll[inx].id === data.id, ' -----dataAll[inx].id === data.id');
      dataAll[inx] = data;
      console.log(dataAll[inx], ' ------------------- dataAll[inx]');
      
      this.writeAll(dataAll);
    } else {
      // fs.writeFile(
      //   path.join(__dirname, "..", "data", "backet.json"),
      //   JSON.stringify(data),
      //   (err) => {
      //     if (err) {
      //       console.error(err);
      //     } else {
      //       console.log(data, " - data");
      //     }
      //   }
      // );
      console.log("ELSE DONE".green.bgMagenta);
      dataAll.push(data);
      this.writeAll(dataAll);
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
          console.log(data, " - data".green.bgMagenta);
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
            if(content === "" || content === []) {
              console.log('JSON.parse(content) === ""');
              resolve([]);
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

    console.log(data.length, ' - data.length in GetID'.green.bgMagenta);
    console.log(data, ' - data GETID model'.green.bgMagenta);
    console.log(typeof data, " - typeof data GETID model".green.bgMagenta);
    if(data === []) {
      return [];
    } else {
      let idData = data.filter((item) => item.id === id);
      console.log('RETURN FROM MODEL getID=====================================', idData[0]);
      return idData[0];
    }
  },

  getSum: async function(data) {
    let sum;
    for(let i = data.length; i < data.length; i++) {
      console.log(data.price,' - data.price is for'.green.bgMagenta);
        sum = data.count * data.price;
        console.log(sum, ' - sum'.green.bgMagenta); 
    };
    return sum;
  }
};

module.exports = backet;
