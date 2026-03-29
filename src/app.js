import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// import cookie-parser

// basic cors configuration.
app.use(express.json({limit : "16kb"}));
app.use(express.urlencoded ({extended: true, limit:"16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.use(cors({
    origin : process.env.CORS_ORIGIN?.spilit(",") || "http://localhost:5173",
    credentials : true,
    methods : ["GET","POST","PUT","DELETE","PATCH","OPTIONS","HEAD"],
    allowedHeaders : ["Content-Type","Authorization","X-Requested-With","Accept"],
}));

// import routes..

import healthCheckRouter from "./controllers/healthcheck.controllers.js";
import authRouter from "./routes/auth.routes.js";
import proejctRouter from "./routes/proejct.routes.js";

import { cookie } from "express-validator";

app.use("/api/v1/healthcheck",healthCheckRouter);
app.use("/api/v1/auth",authRouter);
app.use("api/v1/projects", proejctRouter);


app.get('/', (req, res) => {
  res.send('Nodemon is working!')
});

export default app;
