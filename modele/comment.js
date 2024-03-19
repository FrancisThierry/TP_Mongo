const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    comment_text: {
        type: String,
        required: true,
    },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports= Comment;