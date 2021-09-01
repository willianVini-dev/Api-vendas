import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import appError from "../../errors/appError";
import auth from "../../../config/auth";

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;
  if (!authHeader) throw new appError("JWT Token não enviado");

  const [, token] = authHeader.split(" ");

  try {
    const tokenDecode = verify(token, auth.jwt.secret);
    const { sub } = tokenDecode as TokenPayload;

    req.user = {
      id: sub,
    };
    return next();
  } catch (error) {
    throw new appError("JWT invalido");
  }
}

export { isAuthenticated };
