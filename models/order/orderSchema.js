const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerID: {
    type: String,
    required: true
  },
  bookID: {
    type: String,
    required: true
  },
  initialDate: {
    type: Date,
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
