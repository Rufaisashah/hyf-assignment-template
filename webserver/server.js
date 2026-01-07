const express = require('express');
const app = express();
const port = 3000;


const users = [{name: "simpson"}, {name: "Bart"}];


app.get('/', (req, res) => {
    res.send('<h1>Welcome to my Webserver!</h1>');
});


app.get('/user-count', (req, res) => {
    res.json({ count: users.length });
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/add-user', express.json(), (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.json({ message: 'User added!', user: newUser });
});

app.get('/random-user', (req, res) => {
    const randomIndex = Math.floor(Math.random() * users.length);
    res.json(users[randomIndex]);
});

app.get('/home', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>User Count</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; padding-top: 50px; }
                h1 { color: #333; }
                .count { font-size: 2em; color: #007BFF; }
            </style>
        </head>
        <body>
            <h1>Total Users in Database</h1>
            <div class="count" id="userCount">Loading...</div>

            <script>
                fetch('/user-count')
                    .then(response => response.json())
                    .then(data => {
                        document.getElementById('userCount').textContent = data.count;
                    });
            </script>
        </body>
        </html>
    `);
});


app.listen(3000,function(){
  console.log('Server is ready');
});