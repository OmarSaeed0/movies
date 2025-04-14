const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tourRoutes = require('./routes/tourRoutes');


dotenv.config({ path: './.env' });

const app = express();
const cors = require('cors');



app.use(cors());

app.use(express.json());
app.use(express.static(`${__dirname}`));

mongoose.connect(process.env.DATABASE).then(() => console.log('DB connection successful!'));

app.use('/api/movies', tourRoutes);
module.exports=app;