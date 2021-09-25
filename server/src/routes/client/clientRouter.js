const express = require('express');
const clientRouter = express.Router();
const clientController = require('../../controllers/client/clientController');
const clientValidators = require('../../controllers/client/clientValidators');

// define the home page route

clientRouter.post(
  '/sendDetails',
  clientValidators.SendDetailsValidator,
  clientController.SendDetails
);

clientRouter.get('/sendDetails', clientController.SendDynamicHtml);

module.exports = clientRouter;
