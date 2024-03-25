import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose, { ConnectOptions } from "mongoose";
import { MovieRepo } from "../repository/movieRepo";
import { movieModel } from "../model/movie";

jest.mock("../model/movie"); //clone database



describe("Unit Test", () => {
  let userRepositoryInstance: MovieRepo;
  // Renamed for clarity

  beforeEach(() => {
    userRepositoryInstance = new MovieRepo();
  });

  describe("createUser", () => {
    test("should add a user", async () => {
      const MOCK_MOVIE = {
        name: "test_user",
        released_on: "2024-02-13",
      };
      (movieModel.prototype.save as jest.Mock).mockResolvedValue(MOCK_MOVIE);
      const newMovie = await userRepositoryInstance.createMovie(MOCK_MOVIE);
      expect(newMovie).toBeDefined();
      expect(newMovie.name).toEqual(MOCK_MOVIE.name);
      expect(newMovie.released_on).toEqual(MOCK_MOVIE.released_on);
    });
  });
  test("get user by id", async () => {
    const MOCK_MOVIE = {
      name: "test_user",
      released_on: "2024-02-13",
      _id: "9",
    };
    (movieModel.findById as jest.Mock).mockResolvedValue(MOCK_MOVIE);
    const getMovie = await userRepositoryInstance.getById(MOCK_MOVIE._id);
    console.log("this id", MOCK_MOVIE._id);
    expect(getMovie).toBeDefined();
    expect(getMovie?._id).toEqual(MOCK_MOVIE._id);
  });
  test("get all user", async () => {
    const MOCK_MOVIE = {
      name: "test_user",
      released_on: "2024-02-13",
      _id: "9",
    };
    (movieModel.find as jest.Mock).mockResolvedValue(MOCK_MOVIE);
    const getAllMovies = await userRepositoryInstance.getAll();
    expect(getAllMovies).toBeDefined();
  });
  test("Update by using ID", async () => {
    const MOCK_MOVIE = {
      name: "test_user",
      released_on: "2024-02-13",
      _id: "9",
    };
    (movieModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(MOCK_MOVIE);
    const updateMovie = await userRepositoryInstance.updateById(
      MOCK_MOVIE._id,
      MOCK_MOVIE
    );
    console.log("up Id", MOCK_MOVIE._id);
    expect(updateMovie).toBeDefined();
    expect(updateMovie).toEqual(MOCK_MOVIE);
  });
  test("Delete by ID", async () => {
    const MOCK_MOVIE = {
      name: "test_user",
      released_on: "2024-02-13",
      _id: "9",
    };
    (movieModel.deleteOne as jest.Mock).mockResolvedValue(MOCK_MOVIE);
    const deleteById = await userRepositoryInstance.deleteById(MOCK_MOVIE._id);
    expect(deleteById).toBeDefined();
    expect(deleteById).toEqual(MOCK_MOVIE);
  })
});
