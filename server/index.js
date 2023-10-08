import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from './db.js';
import User from './models.js';
import cors from 'cors';





const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200,
};

var token =''
 
app.use(cors(corsOptions));
app.use(express.json());

const JWT_SECRET = 'mysecretkey';

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJpYXQiOjE2OTY3OTYwNDN9.tpZStULcZXd3dlNiLnedQtRWP03uOJzNX6zRPSR9k6s';
    if (token == null) {
        return res.status(401).json({ message: 'Authentication token is missing' });
    }

    jwt.verify(token, JWT_SECRET, async (err, decodedToken) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        try {
            const user = await User.findOne({ name: decodedToken.name });
            if (!user) {
                return res.status(400).json({ message: 'Cannot find user' });
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(500).send();
        }
    });
}

// Register Route
app.post('/register', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ name: req.body.name, password: hashedPassword });

        // Save the user to the database
        await user.save();

        // Create a JWT token
        const token = jwt.sign({ name: user.name }, JWT_SECRET);

        // Store the token in the user document
        user.tokens = user.tokens.concat({ token });
        await user.save();

        res.status(201).json({ token });
    } catch (error) {
        res.status(500).send(error);
    }
});


// Login Route
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) {
            return res.status(400).json({ message: 'Cannot find user' });
        }

        if (await bcrypt.compare(req.body.password, user.password)) {
            // Create and send a JWT token on successful login
            const token = jwt.sign({ name: user.name }, JWT_SECRET);
            token = token;
            res.json({ token });

        } else {
            res.status(401).json({ message: 'Invalid password' });
        }
    } catch (error) {
        res.status(500).send();
    }
});



app.get('/protected', authenticateToken, (req, res) => {
    // The decoded token is available in the req.user object
    console.log(token);

    const decodedToken = req.user;
    console.log("Decoded Token:", decodedToken);
    
    res.json({ message: 'This is a protected route', user: req.user });
});

  
db();
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
