const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String },
    description: { type: String },
    publication: { type: String },
    rating: { type: Number, default: 4.5 },
    category: { type: String, required: true }, // New Field: Genre
    reviews: [{
        user: String,
        comment: String,
        rating: Number
    }],
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);
