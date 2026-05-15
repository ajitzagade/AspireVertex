import { Router } from "express";
import { siteConfig } from "../data/site.js";

export const servicesRouter = Router();

servicesRouter.get("/", (_req, res) => {
  res.json(siteConfig.services);
});
