const router = require('express').Router();

//Get all users
router.get('/', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Get single user by id with thoughts and friends data populated.
router.get('/:id', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Create a new user
router.post('/', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Update a user by  its id
router.put('/:id', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Delete user by its id
router.delete('/:id', (req, res) => {
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