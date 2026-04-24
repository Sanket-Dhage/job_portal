import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicantRoute from "./routes/application.route.js";
import path from "path";
dotenv.config({});

const app = express();
const __dirname = path.resolve();

// app.get("/home", (req, res) => {
//   return res.status(200).json({
//     message: "Hello from backend",
//     success: true,
//   });
// });

//middlewares

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "https://job-portal-project-q2jt.onrender.com",
  credentials: true,
};
app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

//api's

app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicantRoute);

app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "/frontend/dist/index.html"));
});
app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on ${PORT}`);
});
