import { Response, NextFunction } from "express";
import { Request } from "@irontimer/utils";
import rateLimit, { Options } from "express-rate-limit";
import IronTimerError from "../utils/error";

const REQUEST_MULTIPLIER = process.env.MODE === "dev" ? 100 : 1;

const getKey = (req: Request /*, _res: Response*/): string => {
  return req?.ctx?.decodedToken?.userID;
};

const customHandler = (
  _req: Request,
  _res: Response,
  _next: NextFunction,
  _options: Options
): void => {
  throw new IronTimerError(429, "Too many attempts, please try again later.");
};

const ONE_MINUTE = 1000 * 60;

export default rateLimit({
  windowMs: ONE_MINUTE,
  max: 30 * REQUEST_MULTIPLIER,
  keyGenerator: getKey,
  handler: customHandler,
  skip: (req: Request /*, _res*/) => {
    const decodedToken = req?.ctx?.decodedToken;
    return decodedToken?.type !== "ApiKey";
  }
});
