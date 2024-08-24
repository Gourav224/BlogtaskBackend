import express from 'express'
import cookieParser from 'cookie-parser';
import cors from "cors"
const app = express();

const allowedOrigins = ['http://localhost:3000', 'http://192.168.29.225:3000','*'];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true,
}));


app.use(express.json({
    limit: "16kb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "16kb"
}));

app.use(express.static("public"));

app.use(cookieParser());


//routes import

import userRouter from './routes/user.routes.js';
import postRouter from './routes/post.routes.js';


//routes declaration

// user routes
app.use("/api/v1/users", userRouter);

//post routes
app.use("/api/v1/post", postRouter);

//http://localhost:5000/api/v1/users/register

export { app }