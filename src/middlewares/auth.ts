import { jwtService } from "../services";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS_CODE } from "../utils/enums";

export async function authenticate(
    req: Request,
    res: Response,
    next: NextFunction
) {
    let token = req.headers["authorization"];
    if (!token) {
        return res
            .status(HTTP_STATUS_CODE.UNAUTHORIZED)
            .json({ message: "Invalid token" });
    }
    token = token.startsWith("Bearer ") ? token.slice(7, token.length) : token;

    try {
        const tokenPayload = await jwtService.verifyAccessToken(token);
        // @ts-ignore
        req.tokenPayload = tokenPayload;
        next();
    } catch (err) {
        return res
            .status(HTTP_STATUS_CODE.UNAUTHORIZED)
            .json({ message: "Invalid token" });
    }
}
