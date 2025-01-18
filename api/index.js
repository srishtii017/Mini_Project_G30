const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json());

app.use(cors({
    credentials: true ,
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
}));



app.get('/test', (req, res) => {
    console.log("hello")
    res.json('text ok')
})

app.post('/register', (req, res) => {
    const { name, email, password } = req.body;
    console.log(name);
    res.json({name , email , password});
} )

app.listen(4000, () => {
    console.log("app is running");
})