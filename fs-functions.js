const fs = require("fs");
const write = (obj) => {
    fs.writeFile("./artistdata.json", obj, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("file written");
      }
    });
  };


module.exports = {
    write
}