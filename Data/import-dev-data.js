const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Tour = require('../models/tourModel'); // Adjust the path if your model is located elsewhere

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/tourDB').then(() => console.log('DB connection successful!'))
.catch(err => console.error('DB connection error:', err));

// Path to your data.json file
const dataPath = path.join(__dirname, 'data.json');

// Read and parse JSON data
const toursData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

// Function to import data
const importData = async () => {
  try {
    await Tour.create(toursData.tours); // Correctly reference tours
    console.log('Data successfully imported!');
    process.exit(0); // Success
  } catch (err) {
    console.error('Error importing data:', err);
    process.exit(1); // Error
  }
};

// Function to delete data
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
    process.exit(0); // Success
  } catch (err) {
    console.error('Error deleting data:', err);
    process.exit(1); // Error
  }
};

// Check command-line arguments
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
