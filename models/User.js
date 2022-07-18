const {Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            match: /([a-z.]){6,30}@([a-z])+\.([a-z])+/,
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought',
            },
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user',
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

//Virtual property 'friendCount'
userSchema.virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

//Initialize model
const User = model('user', userSchema);

module.exports = User;