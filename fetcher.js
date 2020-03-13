const args = process.argv.slice(2);
const request = require('request');
const fs = require('fs');
const readline = require('readline');

const fetcher = (target, file) => {
  request(target, (error, response, body) => {
    if (response.statusCode !== 200) {
      console.log(response.statusCode);
      process.exit();
    }
    verifyFile(error);
    fs.readFile(file, x => {
      if (x) {
        saveToFile(body, file);
      } else {
        process.exit();
      }
    });
  });
};

const verifyFile = x => {
  if (x) {
    console.log('Error downloading.');
    console.log(trimError(x));
    process.exit();
  }
  return true;
};

const saveToFile = (content, fileName) => {
  fs.writeFile(fileName, content, x => {
    if (x) {
      console.log(trimError(x));
      process.exit();
    } else {
      console.log('Downloaded and saved ' + content.length + ' bytes to ' + fileName);
    }
  });
  return true;
};

const trimError = x => String(x).split('\n')[0];

fetcher(args[0], args[1]);