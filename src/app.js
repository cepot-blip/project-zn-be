import express from "express";
import cors from "cors";
import helmet from "helmet";
import users_routes from "./api/router/Users/routes";

export const app = express();

// MIDDLEWARE
app.use((req, res, next) => {
  // WEBSITE YOU WISH TO ALLOW TO CONNECT
  res.setHeader("Access-Control-Allow-Origin", "*");

  // REQUEST METHODS YOU WISH TO ALLOW
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, PATCH, HEAD",
    "X-Requested-With,content-type"
  );

  // REQUEST HEADERS YOU WISH TO ALLOW
  res.setHeader(
    "Access-Control-Allow-Headers", 
    "Content-Type, Authorization"
  );
      // COOKIES
  res.setHeader("Access-Control-Allow-Credentials", true);

  // PASS TO NEXT LAYER OF MIDDLEWARE
  next();
});


app.set("trust proxy", false);

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 201,
  })
);

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use("/api_v1", users_routes);


// HANDLE ERRORS
app.use((error, req, res, next) => {
  res.json({
    error: {
      message: error.message,
    },
  });
});

export default app