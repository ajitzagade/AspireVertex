import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { API_ROUTES } from "@aspire/shared";
import { siteRouter } from "./routes/site.js";
import { servicesRouter } from "./routes/services.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN ?? "http://localhost:5173",
    credentials: true,
  }),
);
app.use(morgan("dev"));
app.use(express.json());

app.get(API_ROUTES.health, (_req, res) => {
  res.json({ status: "ok", service: "aspire-api" });
});

app.use(API_ROUTES.site, siteRouter);
app.use(API_ROUTES.services, servicesRouter);

app.listen(port, () => {
  console.log(`AspireInfraTech API listening on http://localhost:${port}`);
});
