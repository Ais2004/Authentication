const express = require('express');
const ensureAuthenticated = require('../middlewares/Auth');

const router = express.Router(); // Correctly initialize the router

router.post('/', ensureAuthenticated, (req, res) => {
    res.status(200).json([
        {
            name: "mobile",
            price: 100000
        },
        {
            name: "tv",
            price: 100000
        }
    ]);
});

module.exports = router;
