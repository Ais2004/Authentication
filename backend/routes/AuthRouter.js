const express = require('express');
const { signupValidation,loginValidation } = require('../middlewares/AuthValidation');
const { signup,signin } = require('../controllers/AuthController'); // Assuming you have a signup function in AuthController

const router = express.Router(); // Correctly initialize the router

router.post('/login', (req, res) => {
    res.send('login successful');
});

router.post('/login', loginValidation, signin);

router.post('/signup', signupValidation, signup);

module.exports = router;
