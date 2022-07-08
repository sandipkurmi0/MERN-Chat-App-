const mongoose = require('mongoose')

const InboxSchema = new mongoose.Schema({
    MessageSid: {
        type: String,
    },
    to: {
        type: String,
    },
    Twilio_number: {
        type: String,
    },
    message: {
        type: String,
    },
    type: {
        type: String,
        enum: ['send', 'received'],
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Inbox', InboxSchema)