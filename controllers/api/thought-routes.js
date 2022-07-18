const router = require('express').Router();

//Get all thoughts
router.get('/', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Get thought by id
router.get('/:thoughtId', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Add a new thought. Need to push it to the user's thoughts array.
router.post('/', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Update thought by id
router.put('/:thoughtId', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//Delete thought by id
router.delete('/:thoughtId', (req, res) => {
    try {

    }catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

//create a reaction stored in a single thought's reactions array field
router.post('/:thoughtId/reactions', (req, res) => {
    try {

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