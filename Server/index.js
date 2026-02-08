const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

/* Middleware */
app.use(cors());
app.use(express.json());

/* MongoDB Connection */
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

/* Routes */
app.use("/api/resume", require("./routes/resumeRoutes"));
const atsRoutes = require("./routes/atsRoutes");

app.use("/api/ats", atsRoutes);


/* Health Check */
app.get("/", (req, res) => {
  res.send("ATS Resume Builder Backend is running");
});

/* Server */
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
