const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
    bookTitle: { type: String, required: true }, // Denormalized for easy display
    price: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // The buyer
    customerName: { type: String, required: true },
    address: { type: String, required: true },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Tracking the seller
    status: { type: String, default: 'Pending' } // Pending, Shipped, Delivered
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
