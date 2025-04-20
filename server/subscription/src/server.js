require("dotenv").config();
const express = require("express");  //express: Web server framework
const mongoose = require("mongoose");  //MongoDB ODM
const cors = require("cors");  //Allows cross-origin requests
const helmet = require("helmet");  //Sets HTTP headers for security

const app = express();
const PORT = process.env.PORT || 5002;
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
      console.log(`Subscription service running on port ${PORT}`)
    );
  } catch (error) {
    console.log(`Failed to connect to a server: `, error);
    process.exit(1);
  }
}

startServer();
