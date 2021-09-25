const { ObjectDeconstruct } = require('../../helpers/objectDeconstructor');
const clientService = require('../../services/client/clientService');
const contractService = require('../../services/contract/contractService');
const lineReader = require('line-reader');
const { convert } = require('html-to-text');
const fs = require('fs');
const path = require('path');

const templatepath =
  'C:/Users/User/Desktop/Developing/contract-project/server/src/services/contract/templates/demo.html';
const contractTextPath =
  'C:/Users/User/Desktop/Developing/contract-project/server/src/services/contract/templates/contractText.txt';

exports.SendDetails = async (req, res) => {
  const sendDetails = ObjectDeconstruct(
    req.body,
    'firstName',
    'lastName',
    'age',
    'email'
  );

  // console.log(
  //   path.join(
  //     'C:/Users/User/Desktop/Developing/contract-project/server/src/',
  //     './services',
  //     './contract',
  //     './templates',
  //     './contractText.txt'
  //   )
  // );

  // const clientKeys = Object.keys(sendDetails);

  try {
    const clientDocument = contractService.CreateContract(sendDetails);
    // await clientService.AddClientToDb(sendDetails);

    //   lineReader.eachLine(templatepath, (line) => {
    //     clientKeys.forEach((key) => {
    //       line = line.replace(`__${key}__`, sendDetails[key]);
    //     });
    //     req.contract = convert(line);
    //     fs.writeFile(contractTextPath, req.contract, (err) => {
    //       if (err) throw err;
    //     });
    //   });
    console.log(clientDocument);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

exports.SendDynamicHtml = (req, res) => {
  res.sendFile(
    path.join(
      'C:/Users/User/Desktop/Developing/contract-project/server/src/',
      './services',
      './contract',
      './contractText.txt'
    )
  );
};
