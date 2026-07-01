const express = require('express');
const jwt = require('jsonwebtoken');
const authMiddleware  = require('./authMiddleware');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const feedbacks = [];

const users = [];

app.post('/signup', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username);
    if(userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    else{
        users.push({ username, password });
        return res.status(201).json({ message: 'User registered successfully' });
    }
})

app.post('/signin', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const userExists = users.find(user => user.username === username && user.password === password);
    if(!userExists) {
        return res.status(400).json({ message: 'Invalid username or password' });
    }
    else{
        const token = jwt.sign({username}, 'nixon123')
        res.send({ token });
    }
})

app.post('/feedback',authMiddleware , function (req, res) {
    const username = req.username;
    const feedback = req.body.feedback;

    feedbacks.push({ username, feedback });
    return res.status(201).json({ message: 'Feedback submitted successfully' });
})

app.get('/feedback', authMiddleware, function (req, res) {
    const username = req.username;
    const userFeedbacks = feedbacks.filter(fb => fb.username === username);
    res.json(userFeedbacks);
})

app.get('/', function (req, res) {
    res.sendFile("/Users/nixonpaul/Code_learn/WebDev26/http-server/studentFeedbackApp/Student-feedback-app/frontend/index.html");
})

app.get('/signup', function (req, res) {
    res.sendFile("/Users/nixonpaul/Code_learn/WebDev26/http-server/studentFeedbackApp/Student-feedback-app/frontend/signup.html");
})

app.get('/signin', function (req, res) {
    res.sendFile("/Users/nixonpaul/Code_learn/WebDev26/http-server/studentFeedbackApp/Student-feedback-app/frontend/signin.html");
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});