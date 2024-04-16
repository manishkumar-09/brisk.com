import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    let token = authHeader.split(" ")[1];
    jwt.verify(token, "MISSISSIPI", (err, decoded) => {
      if (decoded) {
        req.user = decoded;
        next();
      } else {
        return res.status(401).json({ message: "You are not authorized" });
      }
    });
  } else {
    res.status(404).json({
      message: "Token not found",
    });
  }
};
