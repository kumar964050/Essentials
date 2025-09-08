import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import fileUpload from "express-fileupload";
import ErrorHandler from "./middlewares/errorHandler";

import apiRoutes from "./routes/index.routes";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));
app.use(morgan("dev"));
app.use(cors());

// API Routes
app.use("/api", apiRoutes);

// global error handler
app.use(ErrorHandler);

export default app;
