import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

// Equivalent to __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.on("error" ,(err)=>{
    console.log('ERROR :: ',err);
    throw err
})

const allowedOrigins = [process.env.CORS_ORIGIN, "http://localhost:5173","http://localhost:8000"];

app.use(cors({
    origin : allowedOrigins,
    credentials : true
}))



app.use(express.static(path.join(__dirname, '..', 'public', 'dist')));


// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '..', 'public/dist', 'index.html'));
// });



// config app about input data type 
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded({limit : "16kb" , extended : true}));
app.use(express.static("public"));
app.use(cookieParser());

// routes
import userRouter from "./routes/user.routes.js";
import tweetRouter from './routes/tweet.routes.js';
import commentRouter from './routes/comment.routes.js';
import likeRouter from './routes/like.routes.js';
import playlistRouter from './routes/playlist.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import videoRouter from './routes/video.routes.js';
import dashboardRouter from "./routes/dashboard.routes.js";


app.use("/api/user",userRouter);
app.use('/api/tweets',tweetRouter);
app.use("/api/comments",commentRouter);
app.use("/api/like",likeRouter);
app.use("/api/playlist",playlistRouter);
app.use("/api/subscription",subscriptionRouter);
app.use("/api/video",videoRouter);
app.use("/api/dashboard",dashboardRouter);


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/dist', 'index.html'));
});



export {app};