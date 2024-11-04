import express from "express";
import mongoose from "mongoose";
import fs from "fs";
import morgan from "morgan";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const PORT = 3006; //3000-3005 are in use on my desktop
//mongoDB

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

//paths to js files
import jokesRoutes from "./routes_(controller)/jokesRoute.js";
import usersRoutes from "./routes_(controller)/usersRoute.js";
import productsRoutes from "./routes_(controller)/productsRoute.js";
//util js file
import util from "./utils/util.js";
//middleware js
import logRequest from "./middleware/logger.js";

//middleware
app.use(express.json());
app.use(morgan("tiny"));
// app.use(logRequest);//not with nodemon
app.use(cors()); // or app.use(cors({ origin: "http://127.0.0.1:5500" }));
//routes
app.use("/api/jokes", jokesRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// TODO: add postman screenshots to V1
