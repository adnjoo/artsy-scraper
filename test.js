// require for Node
const fs = require("fs");
const axios = require("axios");
const functions = require('./fs-functions')
const artists = require('./randomartists')

// declare vars
const client_id = "d7b5e06fed971b560f2f";
const client_secret = "92122aaf680fe0def89ce3bcc6d9d1d5";
let apiUrl = "https://api.artsy.net/api/tokens/xapp_token";
let artist_id, artist_name;

const readandwrite = input => {
  fs.readFile("./artistdata.json", "utf-8", (err, jsonString) => {
    const data = JSON.parse(jsonString);
    data.artists.push(input);
    functions.write(JSON.stringify(data));
  });
};

const getArtist = async (input) => {
  const res = await axios.post(apiUrl, {
    client_id,
    client_secret,
  });
  xappToken = res.data.token;
  const res3 = await axios
    .get(
      // `https://api.artsy.net/api/search?q=${input}`,
      `https://api.artsy.net/api/search?q=${input}+more:pagemap:metatags-og_type:artist`,
      {
        headers: {
          "X-XAPP-Token": xappToken,
        },
      }
    )
    .then((res2) => {
      //   console.log(res2.data)
      for (let i in res2.data._embedded.results) {
        if (res2.data._embedded.results[i].type === "artist") {
          console.log(res2.data._embedded.results[i].title);
          artist_name = res2.data._embedded.results[i].title;
          artist_id = res2.data._embedded.results[i]["_links"].self.href;
          artist_id = artist_id.slice(
            artist_id.indexOf("artists/") + "artists/".length
          );
          let obj = {
            artist_name,
            artist_id,
          };
          console.log(obj);
          readandwrite(obj);
          return res2.data._embedded.results[i];
        }
      }
    });
};


const thingy = async () => {
  for (let i in artists) {
    let thing = await getArtist(artists[i]);
    console.log(thing)
  }
};

thingy()