import _ from "lodash";
import psas from "./psas";
import users from "./users";
import configs from "./configs";
import solves from "./solves";
import presets from "./presets";
import apiKeys from "./api-keys";
import sessions from "./sessions";
import { version } from "../../version";
import { asyncHandler } from "../../middlewares/api-utils";
import { IronTimerResponse } from "../../utils/irontimer-response";
import { recordClientVersion } from "../../utils/prometheus";
import { Application, NextFunction, Response, Router } from "express";
import type { Request } from "@irontimer/utils";

const pathOverride = process.env.API_PATH_OVERRIDE;
const BASE_ROUTE = pathOverride ? `/${pathOverride}` : "";
const APP_START_TIME = Date.now();

const API_ROUTE_MAP = {
  "/users": users,
  "/configs": configs,
  "/solves": solves,
  "/presets": presets,
  "/psas": psas,
  "/api-keys": apiKeys,
  "/sessions": sessions
};

function addApiRoutes(app: Application): void {
  app.use((req: Request, res: Response, next: NextFunction): void => {
    const inMaintenance =
      process.env.MAINTENANCE === "true" || req.ctx.configuration.maintenance;

    if (inMaintenance) {
      res.status(503).json({ message: "Server is down for maintenance" });
      return;
    }

    if (req.path === "/psas") {
      const clientVersion = req.headers["client-version"];
      recordClientVersion(clientVersion?.toString() ?? "unknown");
    }

    next();
  });

  app.get(
    "/",
    asyncHandler(async () => {
      return new IronTimerResponse("ok", {
        uptime: Date.now() - APP_START_TIME,
        version
      });
    })
  );

  app.get("/psa", (_req, res) => {
    res.json([
      {
        message:
          "It seems like your client version is very out of date as you're requesting an API endpoint that no longer exists. This will likely cause most of the website to not function correctly. Please clear your cache, or contact support if this message persists.",
        sticky: true
      }
    ]);
  });

  _.each(API_ROUTE_MAP, (router: Router, route) => {
    const apiRoute = `${BASE_ROUTE}${route}`;
    app.use(apiRoute, router);
  });

  app.use(
    asyncHandler(async (req) => {
      return new IronTimerResponse(
        `Unknown request URL (${req.method}: ${req.path})`,
        null,
        404
      );
    })
  );
}

export default addApiRoutes;
