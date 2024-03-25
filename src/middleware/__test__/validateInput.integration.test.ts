import { NextFunction, Request, Response } from "express";
import z from "zod";
import { validateInput } from "../validateInput";
import { BaseCustomError } from "../../utils/statusCode";

describe("test validate", () => {
  let req: { body: any }; // Simplified mock object for req
  let res: {}; // Simplified mock object for res
  let next: jest.Mock<NextFunction>;

  beforeEach(() => {
    req = {
      body: {}, // Initialize an empty body for each test case
    };
    res = {};
    next = jest.fn();
  });
  test("if user input follow by schema ", async () => {
    const movieSchema = z.object({
      name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" }),
      released_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in YYYY-MM-DD format",
      }),
    });
    req.body = { name: "leap", released_on: "2020-09-12" };
    const middleware = validateInput(
      req as Request,
      res as Response,
      next as NextFunction,
      movieSchema
    );
    expect(next).toHaveBeenCalled();
  });
  test("if the input error should send it to error handler and statuscode", async () => {
    const movieSchema = z.object({
      name: z
        .string()
        .min(3, { message: "Name must be at least 3 characters long" }),
      released_on: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
        message: "Date must be in YYYY-MM-DD format",
      }),
    });
    req.body = { name: "lp", released_on: "2020-0912" };
    const middleware = validateInput(
      req as Request,
      res as Response,
      next as NextFunction,
      movieSchema
      );
      expect(next).toHaveBeenCalledWith(
        new BaseCustomError(
          [
            "Name must be at least 3 characters long",
            "Date must be in YYYY-MM-DD format",
          ],
          500
        )
      );
  });
});
