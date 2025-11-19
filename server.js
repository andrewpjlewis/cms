import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";

// Import API routes
import documentsRouter from "./server/routes/documents.js";
import messagesRouter from "./server/routes/messages.js";
import contactsRouter from "./server/routes/contacts.js";

// Import Angular index route
import indexRouter from "./server/routes/app.js";

// ES modules __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Angular build folder
const angularDist = path.join(__dirname, "dist/cms/browser");

// Create Express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger("dev"));

// CORS (optional)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

// API routes
app.use("/api/documents", documentsRouter);
app.use("/api/messages", messagesRouter);
app.use("/api/contacts", contactsRouter);

// Angular route for index.html
app.use("/", indexRouter);

// Serve Angular static files
app.use(express.static(angularDist));

// Catch-all for Angular client-side routes (must be last)
app.use((req, res) => {
  res.sendFile(path.join(angularDist, "index.html"));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
