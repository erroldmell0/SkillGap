const express = require('express');
const cookieParser = require('cookie-parser')
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cookieParser());

const stripSlash = (url) => url.trim().replace(/\/+$/, '')

// extra origins can be added from the host without a redeploy: CLIENT_URL=https://a.app,https://b.app
const allowedOrigins = [
    'http://localhost:5173',
    'https://errol-skillgap.vercel.app',
    ...(process.env.CLIENT_URL || '').split(',').map(stripSlash).filter(Boolean),
]

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (e.g. mobile apps, curl)
        if (!origin || allowedOrigins.includes(stripSlash(origin))) {
            callback(null, true)
        } else {
            // refusing without throwing, otherwise express answers 500 instead of
            // just leaving the header off and letting the browser block it
            callback(null, false)
        }
    },
    credentials: true
}))

// require all the routes here
const authRouter = require('./routes/auth.routes')
const interviewRouter = require('./routes/interview.routes')

// health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() });
});

// using all the routes here 
app.use('/api/auth', authRouter)
app.use('/api/interview', interviewRouter)

module.exports = app;
