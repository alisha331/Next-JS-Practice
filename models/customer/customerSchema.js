const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: String,
  age: Number,
  address: {
    street: String,
    city: String,
    pincode: String
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
