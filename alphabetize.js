const fs = require("fs");
const functions = require('./fs-functions')

const readandwrite = (input) => {
  fs.readFile("./artistdata.json", "utf-8", (err, jsonString) => {
    const data = JSON.parse(jsonString);
    console.log(data.artists);
    data.artists.sort(compare)
    functions.write(JSON.stringify(data));
  });
};

function compare( a, b ) {
    if ( a.artist_name < b.artist_name ){
      return -1;
    }
    if ( a.artist_name > b.artist_name ){
      return 1;
    }
    return 0;
  }

// var list = {"you": 100, "me": 75, "foo": 116, "bar": 15};
// bar,me,you,foo


readandwrite();
