const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Logging middleware
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Parse JSON body
app.use(express.json());

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/bookDB")
  .then(() => console.log("DB Connected"))
  .catch(() => console.log("DB Error"));

// Routes
const bookRoutes = require("./routes/bookRoutes");
app.use("/books", bookRoutes);

// Start server
app.listen(8000, () => {
  console.log("Server running on port 8000");
});
