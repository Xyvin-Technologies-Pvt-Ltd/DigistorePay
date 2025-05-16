require("./loadEnv"); // Load environment variables before anything else
const express = require("express");
const cors = require("cors");
const app = express();
const fileUpload = require("express-fileupload");
const path = require("path");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const router = require("./route/index");
const catchAsync = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const fs = require("fs");
const cluster = require("cluster");
const os = require("os");
const sequelize = require("./config/database");
if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master process is running with ${numCPUs} CPUs`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Forking a new worker...`);
    cluster.fork();
  });
} else {
  app.set("trust proxy", 1); // Trust the first proxy

  // Whitelist for allowed origins 
  const whitelist = [
    "http://localhost:5173",
    "capacitor://localhost",
    "https://localhost",
    "https://dev-digistorepay.azurewebsites.net",
    "https://digistorepaydev-apis.azurewebsites.net/",
    "https://digistorepay-docker-dev-gxg2g5acejfpfrb3.centralindia-01.azurewebsites.net",
    "https://dev.digistorepay.com",
  ];

  // CORS options delegate function
  const corsOptionsDelegate = function (req, callback) {
    var corsOptions;
    if (whitelist.indexOf(req.header("Origin")) !== -1) {
      corsOptions = {
        origin: true, // reflect (enable) the requested origin in the CORS response
        credentials: true, // include credentials (cookies, authorization headers, etc.)
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
      };
    } else {
      corsOptions = {
        origin: false, // disable CORS for this request
      };
    }
    callback(null, corsOptions); // callback expects two parameters: error and options
  };

  app.use(cors(corsOptionsDelegate));

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  // Determine the correct static file path
  let staticPath = path.join(__dirname, "dist");
  let indexPath = path.join(__dirname, "dist", "index.html");

  if (fs.existsSync(path.join(__dirname, "../frontend/dist"))) {
    staticPath = path.join(__dirname, "../frontend/dist");
    indexPath = path.join(__dirname, "../frontend/dist", "index.html");
  }

  // Serve static files
  app.use(express.static(staticPath));

  // Middleware for file uploads
  app.use(
    fileUpload({
      createParentPath: true,
    })
  );
 
  const dbPassword = encodeURIComponent(process.env.DB_PASSWORD);
  const conString = `postgresql://${process.env.DB_USERNAME}:${dbPassword}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  app.use(
    session({
      store: new PgSession({
        conString: conString,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: process.env.NODE_ENV,
        sameSite: "None",
        httpOnly: true,
      },
    })
  );

  sequelize.authenticate().then(() => {
    console.log("Database connected");
  }).catch((err) => {
    console.log("Database connection failed", err);
  });

  function getISTDateTime() {
    const now = new Date();
    const options = {
      timeZone: "Asia/Kolkata",
      hour12: true,
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Intl.DateTimeFormat("en-IN", options).format(now);
  }

  app.get("/", (req, res) => {
    res.json({
      message: `Welcome to digistore pay application. Latest deployment on Development server: ${getISTDateTime()}`,
    });
  });

  // All routes will be here

  app.use("/api", router);

  app.get("*", (req, res) => {
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Frontend index.html not found.");
    }
  });

  app.use(
    "*",
    catchAsync(async (req, res, next) => {
      throw new AppError(`Can't find ${req.originalUrl} on this server`, 404);
    })
  );

  app.use(globalErrorHandler);

  const PORT = process.env.PORT || 8080;
  
  app.listen(PORT, () => {
    console.log(`Worker ${process.pid} started on port ${PORT}`);
  });
}
