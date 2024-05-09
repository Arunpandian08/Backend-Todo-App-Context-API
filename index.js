import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRouters from "./Routers/todoRouters.js";
import connectDB from "./Database/DbConfig.js";

dotenv.config();
const app = express();

app.use(
    cors({
      origin: 'https://todo-app-with-context-api-08.netlify.app',
    })
  );
  

app.use(express.json());

const PORT = process.env.PORT || 5000;

connectDB();

app.use("/api/user", todoRouters);

app.listen(PORT, () => {
  console.log(`Server is Running at PORT: ${PORT}`);
});
