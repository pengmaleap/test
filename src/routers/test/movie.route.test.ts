import { Response, Request, NextFunction } from "express";
import { MongoMemoryServer } from "mongodb-memory-server";
import supertest from "supertest";
import { app } from "../../app";
import { MovieRepo } from "../../database/repository/movieRepo";
import { any } from "zod";

describe("GET/POST/PUT/DELETE", () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    // Start MongoDB memory server before running tests
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    // Set up your app with the MongoDB URI
    process.env.MONGODB_URI = mongoUri;
  });

  afterAll(async () => {
    // Stop MongoDB memory server after running tests
    await mongoServer.stop();
  });
  const request = supertest(app);

  test("get all movie", async () => {
    const response = await request.get("/movie");
    expect(response.status).toBe(200);
  });
  test("post movie", async () => {
    const movie = {
      name: "Godzilla X Kong",
      released_on: "2020-12-09",
    };

    const response = await request.post("/movie").send(movie);
    expect(response.status).toBe(201);
    console.log(response.body);

    expect(response.body.data.name).toEqual(movie.name);
    expect(response.body.data.released_on).toEqual(movie.released_on);

    if (response.status !== 201) {
      console.log(response.body);
    }
  });
    test('Put on movie by Id', async () => {
       const movie = {
         name: "Godzilla X Kong",
           released_on: "2020-12-09",
         _id:'9',
       };
    
    })
});
