const mongoose = require('mongoose');

const connectDB = () => mongoose.connect('mongodb://localhost:27017/my_app');

module.exports = connectDB;

