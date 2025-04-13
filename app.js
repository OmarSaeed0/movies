const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tourRoutes = require('./routes/tourRoutes');


dotenv.config({ path: './.env' });


const app = express();
app.use(cors({  origin: 'http://127.0.0.1:5173'}));
app.use(express.json());
//app.use(express.static(`${__dirname}`));



mongoose.connect(process.env.DATABASE).then(() => console.log('DB connection successful!'));

app.use('/api/movies', tourRoutes);
module.exports=app;