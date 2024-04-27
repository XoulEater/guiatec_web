import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import teacherRoutes from "./routes/teacherRoutes";
// import excelRoutes from "./routes/excelRoutes";
// import teamRoutes from "./routes/teamRoutes";
// import workplanRoutes from "./routes/workplanRoutes";
// import activitiesRoutes from "./routes/activityRoute";
// import studentRoutes from "./routes/studentRoutes";

dotenv.config();

const app = express();

app.use(express.json());

// Default middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(compression());

// default get route
app.get("/", (req, res) => {
  res.send("Hello Vercel");
});

mongoose.Promise = Promise;
mongoose.connect(process.env.MONGO_CONNECTION_STRING || "");
mongoose.connection.on("error", (err) => {
  console.error(err);
  process.exit();
});
mongoose.connection.once("open", () => {
  console.log("Conexión exitosa a la base de datos.");
});

export default app;
