const {Schema, model} = require('mongoose');

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

//Getter for createdAt field
function formatDate(createdAt) {
    //Empty array to grab the browser's default locale.
    let options = {year: 'numeric', month: 'numeric', day: '2-digit', hour: '2-digit', minute: '2-digit'};
    return createdAt.toLocaleString([], options);
}

//Virtual property 'reactionCount'
thoughtSchema.virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

//Initialize model
const Thought = new model('thought', thoughtSchema);

module.exports = Thought;
