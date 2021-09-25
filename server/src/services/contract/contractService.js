const lineReader = require('line-reader');
const { convert } = require('html-to-text');
const fs = require('fs');

// exports.CreateContract = (clientDetails) => {
//   const path =
//     'C:/Users/User/Desktop/Developing/contract-project/server/src/services/contract/templates/demo.html';
//   const clientKeys = Object.keys(clientDetails);
//   let newHtmlLines = [];
//   // let newLines;
//   const rd = readline.createInterface({
//     input: fs.createReadStream(path),
//     output: process.stdout,
//     // console: false,
//   });

//   rd.on('line', (line) => {
//     clientKeys.forEach((key) => {
//       line = line.replace(`__${key}__`, clientDetails[key]);
//     });
//     newHtmlLines.push(line);
//   });
//   console.log(newHtmlLines);
//   return newHtmlLines;
// };

exports.CreateContract = (clientDetails) => {
  const path =
    'C:/Users/User/Desktop/Developing/contract-project/server/src/services/contract/templates/demo.html';
  const contractTextPath =
    'C:/Users/User/Desktop/Developing/contract-project/server/src/services/contract/templates/contractText.txt';
  const clientKeys = Object.keys(clientDetails);
  lineReader.eachLine(path, (line) => {
    clientKeys.forEach((key) => {
      line = line.replace(`__${key}__`, clientDetails[key]);
    });
    const contractText = convert(line);
    return fs.writeFile('contractText.txt', contractText, (err) => {
      if (err) throw err;
    });
  });
};

exports.WriteInContract = () => {};
