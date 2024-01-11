const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = 'mongodb://localhost:27017/hospital-web-app';
const SECRET_KEY = 'your-secret-key';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ success: false, message: 'Unauthorized' });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ success: false, message: 'Forbidden' });

        req.user = user;
        next();
    });
};

app.post('/login', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const user = await User.findOne({ username, role });

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = jwt.sign({ username, role }, SECRET_KEY, { expiresIn: '1h' });
            res.json({ success: true, message: 'Login successful', token, redirectURL: getRedirectURL(role) });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

// Helper function to determine the redirect URL based on the user role
function getRedirectURL(role) {
    return role === 'user' ? '/user-dashboard' : '/hospital-dashboard';
}

app.post('/register', async (req, res) => {
    try {
        const { username, password, role } = req.body;

        const hashedPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();

        res.json({ success: true, message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.get('/protected', authenticateToken, (req, res) => {
    res.json({ success: true, message: 'Protected route accessed', user: req.user });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
