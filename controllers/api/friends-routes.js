const router = require('express').Router();

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