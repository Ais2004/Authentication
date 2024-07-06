const express = require('express');
const app = express();
require('dotenv').config();
require('./models/db');

const bodyParser = require('body-parser');
const cors = require('cors');
const AuthRouter = require('./routes/AuthRouter');
const ProductRouter=require('./routes/ProductRouter');
const PORT = process.env.PORT || 5173;

app.get('/ping', (req, res) => {
    res.send('PONG');
});

// Corrected typo in bodyParser
app.use(bodyParser.json());
app.use(cors());
app.use('/autho', AuthRouter);
app.use("/products",ProductRouter);

app.listen(PORT, () => {
    console.log("Server is running");
});
