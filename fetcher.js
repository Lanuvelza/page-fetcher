const request = require('request');
const fs = require('fs');

const args = process.argv.splice(2);

const URL = args[0];
const localPath = args[1]; 



const fletcher = function(arg, path) {
  request(arg , (error, response, body) => {
    if (error || response.statusCode < 200 || response.statusCode > 299) {
      throw new Error("URL is a non-200 result"); 
    }

    fs.access(path, fs.constant.F_OK, (err) => {
      if (err) {
        throw new Error("file path does not exist");
      }
    });
    // console.log('error:', error); 
    // console.log('statusCode:', response && response.statusCode); 
    fs.writeFile(path, body, (err) => {
      if (err) { 
        throw err; 
      } 

      fs.stat(path, (err, stats) => {
        if (err) {
          throw err;
        }
        console.log(`Downdloaded and saved ${stats.size} bytes to ${path}`);
      });
    });
  });
};

fletcher(URL,localPath);
