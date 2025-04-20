//used to authenticate users via Google Sign-In tokens before letting them access any 
// protected route (like in your API Gateway)
const { OAuth2Client } = require("google-auth-library");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); //Initializes a client with your Google OAuth client ID

async function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];  //Extract the Bearer token from Authorization header

  if (!token) {
    return res.status(401).json({
      error: "Access denied! No Token provided",
    });
  }

  try {
    const ticket = await client.verifyIdToken({ //Verifies the token's signature and expiration using Google's servers
      idToken: token,   //Checks the token was issued for your app (via audience) 
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload(); //Extracts user data like email, name, sub (user ID)

    //Attach user info to the request
    //This makes user data available to your route handlers or proxy logic
    req.user = {
      userId: payload["sub"],
      email: payload["email"],
      name: payload["name"],
    };

    //Attach user info to headers for downstream services
    //Helps backend microservices identify who made the request
    req.headers["x-user-id"] = payload["sub"];
    req.headers["x-user-email"] = payload["email"];
    req.headers["x-user-name"] = payload["name"];

    next();
  } catch (err) {
    console.error("Token verification failed", err);
    res.status(401).json({
      error: "Invalid Token!",
    });
  }
}

module.exports = authMiddleware;
