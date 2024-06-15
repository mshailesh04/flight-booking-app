import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import authRoute from "./routes/auth.js"
import usersRoute from "./routes/users.js"
import seatsRoute from "./routes/seats.js"
import flightsRoute from "./routes/flights.js"
import cookieParser from "cookie-parser"
import cors from "cors"
const app = express() 

dotenv.config()

const connect = async () => {
    try {
      await mongoose.connect(process.env.MONGO);
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  };

mongoose.connection.on("disconnected", ()=>{
    console.log("mongoDB disconnected!")
})

//middleware

app.use(express.json())
app.use(cookieParser())


// app.use((err, req, res, next) => {
//     if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
//       console.error('Bad JSON');
//       return res.status(400).send({ message: 'Malformed JSON' });
//     }
//     next();
//  });

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/flights", flightsRoute);
app.use("/api/seats", seatsRoute);

app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong!"
    return res.status(errorStatus).json({
        success:false,
        status: errorStatus,
        message: errorMessage,
        stack:err.stack,
    })
})

app.listen(8800, ()=>{
    connect()
    console.log("Connected to backend!")
})