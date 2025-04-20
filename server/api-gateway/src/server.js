//api gateway for microservices

require("dotenv").config();
const express = require("express");
const proxy = require("express-http-proxy");  //Uses express-http-proxy to forward requests to other services
const cors = require("cors");
const helmet = require("helmet");
const authMiddleware = require("./middleware/auth-middleware");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const proxyOptions = {
  proxyReqPathResolver: (req) => {  //Intercepts the original URL of the incoming request (like /v1/designs/create)
    return req.originalUrl.replace(/^\/v1/, "/api");  //Replaces the starting /v1 with /api. Returns the new URL
    //  path that should be forwarded to the target microservice
  },
  proxyErrorHandler: (err, res, next) => {
    res.status(500).json({
      message: "Internal server error!",
      error: err.message,
    });
  },
};
 
//Forwards /v1/designs requests to process.env.DESIGN
app.use(
  "/v1/designs",
  authMiddleware,
  proxy(process.env.DESIGN, {
    ...proxyOptions,
  })
);

// /v1/media/upload goes to the UPLOAD service with body parsing off
app.use(
  "/v1/media/upload",
  authMiddleware,
  proxy(process.env.UPLOAD, {
    ...proxyOptions,
    parseReqBody: false,
  })
);

//For other media requests, body parsing is enabled
app.use(
  "/v1/media",
  authMiddleware,
  proxy(process.env.UPLOAD, {
    ...proxyOptions,
    parseReqBody: true,
  })
);
 
//Forwards subscription requests to SUBSCRIPTION service
app.use(
  "/v1/subscription",
  authMiddleware,
  proxy(process.env.SUBSCRIPTION, {
    ...proxyOptions,
  })
);

app.listen(PORT, () => {
  console.log(`API Gateway is running on port ${PORT}`);
  console.log(`DESIGN Service is running on port ${process.env.DESIGN}`);
  console.log(`UPLOAD Service is running on port ${process.env.UPLOAD}`);
  console.log(
    `SUBSCRIPTION Service is running on port ${process.env.SUBSCRIPTION}`
  );
});
