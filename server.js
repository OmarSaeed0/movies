const app =require('./app')
const express = require('express');

const cors = require('cors');
const app = express();
app.use(cors());



const port = process.env.PORT ;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
