const {Schema, model} = require('mongoose');
const formatDate = require('../utils/dates');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatDate,
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
            {
                type: Schema.Types.ObjectId,
                ref: 'reaction',
            },
        ],
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

//Virtual property 'reactionCount'
thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

//Initialize model
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
