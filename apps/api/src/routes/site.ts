import { Router } from "express";
import { siteConfig } from "../data/site.js";

export const siteRouter = Router();

siteRouter.get("/", (_req, res) => {
  res.json(siteConfig);
});
