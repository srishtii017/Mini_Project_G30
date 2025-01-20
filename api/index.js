const express = require('express')
const cors = require('cors')
const mongoose=require("mongoose")
const bcrypt = require('bcryptjs');
const User = require('./models/user.js');

require('dotenv').config()
const app = express()

const bcryptSalt = bcrypt.genSaltSync(10);

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);
//sUiUNw5tERaataPE

app.get('/test', (req, res) => {
    res.json('text ok')
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    // res.json({ name, email, password });
    const userDoc=await User.create({
        name,
        email,
        password:bcrypt.hashSync(password,bcryptSalt),
    });
    res.json(userDoc);
})

app.listen(4000, () => {
    console.log("app is running");
})