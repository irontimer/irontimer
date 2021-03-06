import { Response } from "express";
import { isCustomCode } from "../constants/irontimer-status-codes";

export class IronTimerResponse {
  message: string;
  data: any;
  status: number;

  constructor(message?: string, data?: any, status = 200) {
    this.message = message ?? "ok";
    this.data = data ?? undefined;
    this.status = status;
  }
}

export function handleIronTimerResponse(
  ironTimerResponse: IronTimerResponse,
  res: Response
): void {
  const { message, data, status } = ironTimerResponse;

  res.status(status);
  if (isCustomCode(status)) {
    res.statusMessage = message;
  }

  if ([301, 302].includes(status)) {
    return res.redirect(data);
  }

  res.json({ message, data });
}
