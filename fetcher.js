const request = require('request');
const fs = require('fs');
const readline = require('readline');

const args = process.argv.splice(2);

const URL = args[0];
const localPath = args[1];



const fletcher = function(arg, path) {
  request(arg , (error, response, body) => {
    if (error) {
      throw new Error(`Error! URL is a non-200 result`);
    }

    fs.exists(path, (exists) => {
      if (!exists) {
        throw new Error("file path does not exist");
      } else {
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout
        });

        process.stdin.setRawMode(true);
        process.stdin.setEncoding('utf8');

        rl.question("Do you want to overwrite the file? press 'Y' to overwrite: ", (answer) => {
          if (answer === "Y") {
            fs.writeFile(path, body, (err) => {
              if (err) {
                throw err;
              }
              console.log(`Downloaded and saved ${body.length} bytes to ${path}`);
            });
          } else {
            console.log("goodbye");
            
          }
          rl.close();
          
        });
      }

    });
        
  });
};


fletcher(URL,localPath);
