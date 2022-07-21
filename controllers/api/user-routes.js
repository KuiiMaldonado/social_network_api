const router = require('express').Router();
const {User, Thought, Reaction} = require('../../models/index');

//Get all users
router.get('/', (req, res) => {
    try {
        User.find({}, (err, result) => {
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

//Get single user by id with thoughts and friends data populated.
router.get('/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).exec();
        await user.populate('friends');
        if (user)
            res.status(200).json(user);
        else
            res.status(404).json({message: 'User doesn\'t exist'});
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = new User({username: req.body.username, email:req.body.email});
        await newUser.save();

        if (newUser) {
            res.status(200).json(newUser);
        }
        else {
            console.log('Something went wrong!');
            res.status(500).json({message: 'something went wrong'});
        }
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Update a user by  its id
router.put('/:userId', async (req, res) => {
    try {
        const isUpdated = await User.findByIdAndUpdate(req.params.userId,
            {$set: req.body},
            {runValidators: true, new:true});
        if (isUpdated)
            res.status(200).json({message: 'User updated!', payload: isUpdated});
        else
            res.status(400).json({message: 'User doesn\'t exist'});
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Delete user by its id
router.delete('/:userId', async (req, res) => {
    try {
        const isDeleted = await User.findByIdAndDelete(req.params.userId);
        if (isDeleted)
            res.status(200).json({message: 'User deleted', payload: isDeleted});
        else
            res.status(400).json({message: 'User doesn\'t exist'});
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        //We make sure the userId actually exists.
        const user = await User.findById(req.params.userId).exec();
        if (user) {
            //If the user exists then we need to check if the friend's id is a valid one.
            const friend = await User.findById(req.params.friendId).exec();
            if (friend) {
                await user.updateOne({$addToSet: {friends: friend._id}})
                await user.save();

                //We need to add the user to the friend's friends list, so they match.
                await friend.updateOne({$addToSet: {friends: user._id}});
                await friend.save();

                res.status(200).json({message: 'Friend added!'});
            }
            else {
                res.status(400).json({message: 'Friend\'s id doesn\'t exist'});
            }
        }
        else {
            res.status(400).json({message: 'User doesn\'t exist'});
        }
    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;