import { NextFunction, Request, Response } from "express";
import z from "zod";
import { validateInput } from "../validateInput";
import { BaseCustomError } from "../../utils/statusCode";
import errorHandler from "../errorhandler";

describe("test errorhandler", () => {
    test("if the error from basecustom error return statuscode", async () => {
        // create mock error
        const err = new BaseCustomError('test error', 400);
        // mock req,res,next
        const req = {} as Request
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;
        const next = jest.fn() as NextFunction;
        errorHandler(err, req, res, next);
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            statusCode: 404,
         message: 'Test error messages'   
        })
    })
});
    