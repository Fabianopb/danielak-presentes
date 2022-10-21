import { NextFunction, Request, RequestHandler, Response } from 'express';

export class BadRequestError extends Error {
  statusCode = 400;
  name = 'BadRequestError';
}

export class UnauthorizedError extends Error {
  statusCode = 402;
  name = 'UnauthorizedError';
}

export class ForbiddenError extends Error {
  statusCode = 403;
  name = 'ForbiddenError';
}

export class NotFoundError extends Error {
  statusCode = 404;
  name = 'NotFoundError';
}

export const serializePayload = <T extends Record<string, unknown>>(payload: T) =>
  Object.entries(payload).reduce(
    (acc, [key, value]) =>
      typeof value === 'object' && value !== null ? { ...acc, [key]: JSON.stringify(value) } : { ...acc, [key]: value },
    {}
  );

export const asyncHandler = (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) =>
  Promise.resolve(fn(req, res, next)).catch(next);
