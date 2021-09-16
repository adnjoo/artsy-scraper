// require for Node, import for react
const fs = require('fs')
const axios = require("axios");
const artistdata = require('./artistdata')


fs.readFile('./artistdata.json','utf-8',(err,jsonString)=>{
    const data = JSON.parse(jsonString)
    console.log(data)
    data['1'].id = 343656565
    write(JSON.stringify(data))
})

const write = (obj) =>{
    fs.writeFile('./artistdata.json', obj, err=>{
        if(err){
            console.log(err)
        } else {
            console.log('file written')
        }
    })

}

const client_id = "d7b5e06fed971b560f2f";
const client_secret = "92122aaf680fe0def89ce3bcc6d9d1d5";
let apiUrl = "https://api.artsy.net/api/tokens/xapp_token";
let artistId, artistName;

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
          console.log(res2.data._embedded.results[i].title)
          artistName = res2.data._embedded.results[i].title;
          artistId= (res2.data._embedded.results[i]['_links'].self.href)
          console.log(
            artistId.slice(artistId.indexOf("artists/") + "artists/".length)
          );
          return res2.data._embedded.results[i];
        }
      }
    });
};

const writeToJson = (input2) => {};

console.log(getArtist("pablo"));
