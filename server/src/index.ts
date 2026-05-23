import express from "express";

import mongoose from "mongoose";

import cors from "cors";

import dotenv from "dotenv";



import authRoutes
from "./routes/authRoutes";

import projectRoutes
from "./routes/projectRoutes";

import fileRoutes
from "./routes/fileRoutes";

import codeExecutionRoutes
from "./routes/codeExecutionRoutes";



dotenv.config();



const app = express();





// MIDDLEWARE
app.use(cors());

app.use(express.json());






// ROUTES
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/files",
  fileRoutes
);

app.use(
  "/api/execute",
  codeExecutionRoutes
);






// TEST ROUTE
app.get("/", (req, res) => {

  res.send(
    "API Running..."
  );
});






// DATABASE
mongoose
  .connect(
    process.env.MONGO_URI as string
  )
  .then(() => {

    console.log(
      "MongoDB Connected"
    );

  })
  .catch((err) => {

    console.log(err);
  });






// SERVER
const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );
});