const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Vivek@#123',
    database: 'user'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    console.log('Connected to database.');
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const checkUserSql = 'SELECT * FROM users WHERE email = ?';
    db.query(checkUserSql, [email], (err, results) => {
        if (err) {
            console.error('Error querying database:', err);
            res.status(500).json({ message: 'Error querying database' });
            return;
        }

        if (results.length === 0) {
            res.status(400).json({ message: 'User does not exist' });
        } else {
            const user = results[0];
            if (user.password === password) {
                res.status(200).json({ message: 'User login successful' });
            } else {
                res.status(400).json({ message: 'Password is incorrect' });
            }
        }
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
