// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const { hashPassword } = require('../../utils/hash');

// Register endpoint
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await hashPassword(password);

    User.create(name, email, hashedPassword, (error, results) => {
      if (error) {
        console.error('Error executing query:', error);
        res.status(500).json({ message: 'Internal server error' });
        return;
      }
      res.status(201).json({ message: 'User registered successfully' });
    });

  } catch (error) {
    console.error('Error hashing password:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Login endpoint
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, async (error, results) => {
    if (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ message: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const user = results[0];
      try {
        if (await bcrypt.compare(password, user.password_hash)) {
          res.status(200).json({ message: 'User login successful' });
        } else {
          res.status(401).json({ message: 'Password is incorrect' });
        }
      } catch (error) {
        console.error('Error comparing passwords:', error);
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  });
});

module.exports = router;
