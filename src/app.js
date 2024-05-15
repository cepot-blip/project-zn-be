import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./api/router";
import ClientError from "./utils/exceptions/ClientError";

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
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  // COOKIES
  res.setHeader("Access-Control-Allow-Credentials", true);

  // PASS TO NEXT LAYER OF MIDDLEWARE
  next();
});

app.set("trust proxy", false);

app.use(cors());

app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "../public")));

// ROUTES
router(app);

// 404 NOT FOUND
app.get("*", (req, res) => {
  return res.status(404).json({
    status: false,
    message: "Halaman tidak ditemukan",
  });
});

// HANDLE ERRORS
app.use((error, req, res, next) => {
  if (error instanceof ClientError) {
    return res.status(error.statusCode).json({
      status: false,
      message: error.message,
    });
  }
  return res.status(500).json({
    status: false,
    message: error.message,
  });
});

export default app;
