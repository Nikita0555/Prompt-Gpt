import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from "cors";

config();
const app = express();

const allowedOrigins=[
  "http:localhost:5173"
];

//middlewares
app.use(
  cors({
    origin:(origin,callback)=>{
      if(!origin || allowedOrigins.indexOf(origin)!==-1){
        callback(null,true);
      }
    else{
      callback(new Error("Not allowed by CORS"));
    }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Enable credentials (cookies, authorization headers, etc.)
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

//remove it in production
app.use(morgan("dev"));

app.get("/",(req,res)=>{
  res.status(200).json({message:"MERN-Gpt Backend api is running successfully!"});
});
app.use("/api/v1", appRouter);

export default app;

//  origin: "*", // Specify exact origin instead of "*"