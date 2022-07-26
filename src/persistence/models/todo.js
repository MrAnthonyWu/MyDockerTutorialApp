const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    }
}, {timestamps: true});

const TodoItem = mongoose.model('todo_item', todoSchema);

module.exports = TodoItem;