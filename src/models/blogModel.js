const mongoose = require('mongoose');
const objId = mongoose.Schema.Types.ObjectId

const blogModel = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: mongoose.Schema.Types.Mixed,
        require: true
    },
    authorId: {
        type: objId,
        required: true,
        ref: "blogProject_author"
    },
    tags: { type: [String] },
    category: {
        type: [String],
        required: true
    },
    subcategory: { type: [String] },
    deletedAt: { type: Date },
    isDeleted: { type: Boolean, default: false },
    publishedAt: { type: Date },
    isPublished: { type: Boolean, default: false }
}, { timestamps: true });


module.exports = mongoose.model('blogProject_blog', blogModel)


