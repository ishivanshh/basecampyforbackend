import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./db/index.js";

// env file configuration.
dotenv.config({
    path: "./.env",
});


const port = process.env.PORT ||3000;

// connect to database.
connectDB()
  .then(()=>{
    app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
  }); 
  })
  .catch((err) => {
    console.log("MongoDB connection Error", err)
    process.exit(1); 
 });
 