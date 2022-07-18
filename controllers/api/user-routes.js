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
router.put('/:userId', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Delete user by its id
router.delete('/:userId', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', (req, res) => {
    try {

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