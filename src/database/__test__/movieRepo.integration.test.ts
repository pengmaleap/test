import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";
import { movieModel } from "../model/movie";
import { MovieRepo } from "../repository/movieRepo";
import { any } from "zod";

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = new MongoMemoryServer();
  await mongoServer.start(); // Ensure server is started before getting URI
  const mongoUri = mongoServer.getUri(); // Now get the URI
  await mongoose.connect(await mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  } as ConnectOptions); // Type cast to ConnectOptions
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer?.stop();
});

describe("Integration test", () => {
  afterEach(async () => {
    try {
      await movieModel.deleteMany({});
    } catch (error) {
      console.error("error", error);
      throw error;
    }
  });
  describe("create movie", () => {
    test("Add movie successfully", async () => {
      const movie = {
        name: "Godzilla X Kong",
        released_on: "28-3-2024",
      };
      let movieRepo = new MovieRepo();
      const newMovie = await movieRepo.createMovie(movie);
      expect(newMovie).toBeDefined();
      expect(newMovie.name).toEqual(movie.name);
    });
    test("if we forgot to fill in the blank", async () => {
      const movie = {
        //  name: "Godzilla X Kong",
        released_on: "28-3-2024",
      };
      let movieRepo = new MovieRepo();

      // Correctly await the promise rejection and expect it to throw
      await expect(movieRepo.createMovie(movie)).rejects.toThrow(
        "Movie validation failed: name: Path `name` is required."
      );
    });
  });
  // describe("get user by id", () => {
  //   test("get user by id", async () => {
  //     const movie = {
  //       name: "Godzilla X Kong",
  //       released_on: "28-3-2024",
       
  //     };
  //     const newMovie = ({ _id: "8", ...movie })
  //     let movieRepo = new MovieRepo();
  //     await movieRepo.createMovie(movie);
  //     const getMovie = await movieRepo.getById("8");
  //     expect(getMovie).toBeDefined();
  //     expect(getMovie).toEqual.(newMovie)
  //   });
  // });
  describe("get all user", () => {
    test("get all user", async () => {
      const movie = {
        name: "Godzilla X Kong",
        released_on: "28-3-2024",
      };
      let movieRepo = new MovieRepo();
      const findMovie = await movieRepo.getAll();
      expect(findMovie).toBeDefined();
    })
  });
  // describe("update by id", () => {
  //   test("update user by id", async () => {
  //     const movie = {
  //       name: "Godzilla X Kong",
  //       released_on: "28-3-2024",
  //       _id: "7",
  //     };
  //     let movieRepo = new MovieRepo();
  //     const updateById = await movieRepo.updateById(movie._id, movie);
  //     expect(updateById).toBeDefined();
  //     expect(updateById).toEqual.()
  //   })
  // })
  // describe("delete by id", () => {
  //   test("delete user by id", async () => {
  //      const movie = {
  //        name: "Godzilla X Kong",
  //        released_on: "28-3-2024",
  //        _id: 7
  //      };
  //     let movieRepo = new MovieRepo();
  //     const delteId = await movieRepo.deleteById(movie._id)
  //     expect(delteId).toBeDefined();
      
  //   })
  // })
});


