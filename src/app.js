import express from "express";
import morgan from "morgan";
import authRoutes from './routes/auth.routes.js'

const app = express();
app.use(morgan("dev"));
export default app;
