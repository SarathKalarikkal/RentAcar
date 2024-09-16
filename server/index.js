import express from 'express';

import apiRouter from './routes/index.js';
import { PORT } from './config/variables.js';
import { connectDB } from './config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();

// Middleware setup
app.use(cors({
    origin: ["https://rent-acar.vercel.app/", "http://localhost:5173"],
    credentials: true
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());


// Connect to the database
connectDB();

app.get("/", (req, res) => {
    res.send("Hello World!");
});


// Set up API routes
app.use('/api', apiRouter);

app.all("*", (req, res, next) => {
    res.status(404).json({ message: "end point does not exist" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});


