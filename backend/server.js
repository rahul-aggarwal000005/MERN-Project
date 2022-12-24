const notes = require("./data/notes");
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middlewares/errorMiddlewares");

dotenv.config();
connectDB();
app.use(express.json());

app.get("/api/notes", (req, res) => {
  res.send(notes);
});

app.use("/api/users", userRoutes);

// using middlewares to format the error
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${5000}`);
});
