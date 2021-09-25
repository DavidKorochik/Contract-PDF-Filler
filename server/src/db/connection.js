const mongoose = require('mongoose');
require('dotenv').config();

exports.connectToDB = (cb) => {
  mongoose.connect(
    process.env.MONGOOSE_URL,
    {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log('Connected to DB');
      cb();
    }
  );
};
