import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODE } from "../utils/enums";

export function ignoreFavicon(req: Request, res: Response, next: NextFunction) {
    if (req.url === "/favicon.ico") {
        res.type("image/x-icon");
        res.status(HTTP_STATUS_CODE.MOVED);
        return res.end();
    }
    next();
}
