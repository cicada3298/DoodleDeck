require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 5003;
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("MongoDB error: ", error));

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function startServer() {
  try {
    app.listen(PORT, () =>
      console.log(`Upload service running on port ${PORT}`)
    );
  } catch (error) {
    console.log(`Failed to connect to a server: `, error);
    process.exit(1);
  }
}

startServer();
