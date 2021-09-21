const fs = require("fs");

const readandwritealpha = (input) => {
  fs.readFile("./artistdata.json", "utf-8", (err, jsonString) => {
    const data = JSON.parse(jsonString);
    console.log(data.artists);
    data.artists.sort(compare);
    functions.write(JSON.stringify(data));
  });
};

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
  readandwritealpha,
  write,
};
