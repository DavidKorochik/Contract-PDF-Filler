const Client = require('../../db/models/client');

exports.AddClientToDb = async (client) => {
  const newClient = new Client({
    ...client,
  });

  try {
    await newClient.save();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
