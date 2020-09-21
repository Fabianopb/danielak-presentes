import { NextFunction, Request, RequestHandler, Response } from 'express';

export const serializePayload = <T extends Record<string, unknown>>(payload: T) =>
  Object.entries(payload).reduce(
    (acc, [key, value]) =>
      typeof value === 'object' && value !== null
        ? { ...acc, [key]: JSON.stringify(value) }
        : { ...acc, [key]: value },
    {},
  );

export const asyncHandler = (fn: RequestHandler) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise.resolve(fn(req, res, next)).catch(next);
