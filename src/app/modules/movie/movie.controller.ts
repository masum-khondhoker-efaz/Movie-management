import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { movieService } from './movie.service';

const createMovie = catchAsync(async (req, res) => {
  const result = await movieService.createIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Movie created successfully',
    data: result,
  });
});

const getMovieList = catchAsync(async (req, res) => {
  const result = await movieService.getListFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Movie list retrieved successfully',
    data: result,
  });
});

const getMovieById = catchAsync(async (req, res) => {
  const result = await movieService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Movie details retrieved successfully',
    data: result,
  });
});

const updateMovie = catchAsync(async (req, res) => {
  const result = await movieService.updateIntoDb(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Movie updated successfully',
    data: result,
  });
});

const deleteMovie = catchAsync(async (req, res) => {
  const result = await movieService.deleteItemFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Movie deleted successfully',
    data: result,
  });
});

export const movieController = {
  createMovie,
  getMovieList,
  getMovieById,
  updateMovie,
  deleteMovie,
};