import { NextFunction, Request, Response } from "express";
import { BaseCustomError } from "../../utils/statusCode";
import errorHandler from "../errorhandler";

describe("errorHandler middleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it("handles BaseCustomError correctly", () => {
    const mockError = new BaseCustomError("Test error", 404);

    errorHandler(mockError, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: "Test error", // Ensure this matches the actual expected message, including capitalization
      statusCode: 404,
    });
  });

  it("handles generic errors correctly", () => {
    const next = jest.fn(); // Mock next function
    const mockError = new Error("Generic error");
    errorHandler(mockError, req as Request, res as Response, next);
    expect(next).toHaveBeenCalled();
  });
});
