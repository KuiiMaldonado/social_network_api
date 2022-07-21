const {User, Thought} = require("../../models");
const router = require('express').Router();

//Get all thoughts
router.get('/', (req, res) => {
    try {
        Thought.find({}, (err, result) => {
            if (result) {
                res.status(200).json(result);
            }
            else {
                console.log('Something went wrong!');
                res.status(500).json({message: 'something went wrong'});
            }
        });
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Get thought by id
router.get('/:thoughtId', (req, res) => {
    try {
        Thought.findById(req.params.thoughtId, (err, result) => {
            if (result) {
                res.status(200).json(result);
            }
            else {
                console.log('Something went wrong!');
                res.status(500).json({message: 'something went wrong'});
            }
        });
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Add a new thought. Need to push it to the user's thoughts array.
router.post('/', async (req, res) => {
    try {
        //We need to make sure the user exists before creating a thought
        const user = await User.findOne({username: req.body.username, _id: req.body.userId}).exec();
        if (user) {
            const newThought = new Thought({thoughtText: req.body.thoughtText, username: req.body.username, userId: req.body.userId});
            await newThought.save();

            if (newThought) {
                await user.updateOne({$addToSet: {thoughts: newThought._id}});
                await user.save();
                res.status(200).json({message: 'Thought added!', payload: newThought});
            }
            else {
                console.log('Something went wrong!');
                res.status(500).json({message: 'something went wrong'});
            }
        }
        else {
            res.status(404).json({message: 'User doesn\'t exist'});
        }


    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Update thought by id
router.put('/:thoughtId', async (req, res) => {
    try {
        const isUpdated = await Thought.findByIdAndUpdate(req.params.thoughtId,
            {$set: req.body},
            {runValidators: true, new:true});
        if (isUpdated)
            res.status(200).json({message: 'Thought updated!', payload: isUpdated});
        else
            res.status(404).json({message: 'Thought doesn\'t exist'});
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Delete thought by id
router.delete('/:thoughtId', async (req, res) => {
    try {
        const isDeleted = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (isDeleted)
            res.status(200).json({message: 'Thought deleted', payload: isDeleted});
        else
            res.status(404).json({message: 'Thought doesn\'t exist'});
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        const updatedThought = await Thought.findOneAndUpdate(req.params.thoughtId,
            {$addToSet: {reactions: req.body}},
            {runValidators: true, new: true});
        if (updatedThought)
            res.status(200).json({message: 'Reaction added!'});
        else
            res.status(404).json({message: 'Thought doesn\'t exist'});
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//pull and remove a reaction by the reaction's reactionId value
router.delete('/:thoughtId/reactions', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;