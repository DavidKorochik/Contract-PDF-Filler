const express = require('express');
const cors = require('cors');
const clientRouter = require('./routes/client/clientRouter');
const { connectToDB } = require('./db/connection');
require('dotenv').config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Add Routers
 */

app.use('/api/client', clientRouter);

connectToDB(() => {
  app.listen(process.env.PORT, () =>
    console.log(`running on port ${process.env.PORT}`)
  );
});
