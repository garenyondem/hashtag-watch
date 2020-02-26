import jwt from "jsonwebtoken";

export class JwtService {
    private secret: string;
    constructor(secret: string) {
        this.secret = secret;
    }
    private generateToken(payload: object, expiresIn: string): Promise<string> {
        return new Promise((resolve, reject) => {
            jwt.sign(
                payload,
                this.secret,
                {
                    expiresIn,
                    algorithm: "RS256"
                },
                (err, encoded) => {
                    if (!err) {
                        resolve(encoded);
                    } else {
                        reject(err);
                    }
                }
            );
        });
    }
    private verifyToken(token: string): Promise<string | object> {
        return new Promise((resolve, reject) => {
            jwt.verify(
                token,
                this.secret,
                { algorithms: ["RS256"] },
                (err, decoded) => {
                    if (!err) {
                        resolve(decoded);
                    } else {
                        reject(err);
                    }
                }
            );
        });
    }
    verifyAccessToken(token: string): Promise<string | object> {
        return this.verifyToken(token);
    }
    generateAccessToken(payload: object, expiresIn: string): Promise<string> {
        return this.generateToken(payload, expiresIn);
    }
}
