import { Router } from "express";
import { analysis } from "../controllers/user";
import { watch } from "../controllers/watch";

export const routes = Router();

routes.get("/watch", watch);
routes.get("/users/analysis", analysis);
