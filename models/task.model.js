const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
    title: {
        type: String,
        default: null
    },
    description: {
        type: String,
        default: null
    },
    dueDate: {
        type: Date,
        default: null
    },
    status: {
        type: Number,
        default: 0 // 'pending' : 0, inprogresss; 1, completed: 2
    },
    order: {
        type: Number,
        default: 0
    },
    assigneeId: {
        type: Schema.Types.ObjectId, ref: 'user',
    },
    userId: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    createdBy: {
        type: Schema.Types.ObjectId, ref: 'user'
    },  
    updatedBy: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    deletedBy: {
        type: Schema.Types.ObjectId, ref: 'user'
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

module.exports = model('task', TaskSchema);