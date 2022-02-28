const mongoose = require('mongoose');

const bookModel = new mongoose.Schema( {
    bookName: {type: String,
    required: true}, 
    price: {
        indianPrice: String, europePrice: String
    },
    year:{ type:String, default:2021},
    authorName: String, 
    tags: [String],
    totalPages: Number,
    stockAvailable: Boolean    
}, { timestamps: true });


module.exports = mongoose.model('Booklibrary', bookModel) 


