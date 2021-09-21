const fs = require("fs");
const functions = require("./fs-functions");

const readandwritealpha = (input) => {
  fs.readFile("./artistdata.json", "utf-8", (err, jsonString) => {
    const data = JSON.parse(jsonString);
    console.log(data.artists);
    data.artists.sort(compareName);
    functions.write(JSON.stringify(data));
  });
};

function compareName(a, b) {
  if (a.artist_name < b.artist_name) {
    return -1;
  }
  if (a.artist_name > b.artist_name) {
    return 1;
  }
  return 0;
}

readandwritealpha();