const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const postSchema = new Schema({
    entry: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: false,
    },
    comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment', required: false }],
    price: {
        type: Number,
        required: false,
    },

});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;