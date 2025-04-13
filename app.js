const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const tourRoutes = require('./routes/tourRoutes');


dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());
//app.use(express.static(`${__dirname}`));
app.use((req, res, next) => {
res.header('Access-Control-Allow-Origin', 'https://movies-g9b2.onrender.com');
res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
res.header('Access-Control-Allow-Headers', 'Content-Type');
next();
});

mongoose.connect(process.env.DATABASE).then(() => console.log('DB connection successful!'));

app.use('/api/movies', tourRoutes);
module.exports=app;