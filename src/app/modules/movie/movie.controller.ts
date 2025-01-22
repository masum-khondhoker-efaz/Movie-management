import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { movieService } from './movie.service';
import { CLIENT_RENEG_LIMIT } from 'tls';

const createMovie = catchAsync(async (req, res) => {
  const user = req.user as any;
  const result = await movieService.createMovieIntoDb(user.id,req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Movie created successfully',
    data: result,
  });
});

const getMovieList = catchAsync(async (req, res) => {
  const result = await movieService.getMovieListFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Movie list retrieved successfully',
    data: result,
  });
});

const getMovieById = catchAsync(async (req, res) => {
  const result = await movieService.getMovieByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Movie details retrieved successfully',
    data: result,
  });
});

const updateMovie = catchAsync(async (req, res) => {
  const result = await movieService.updateMovieIntoDb(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Movie updated successfully',
    data: result,
  });
});

const deleteMovie = catchAsync(async (req, res) => {
  const user = req.user as any;
  const result = await movieService.deleteMovieItemFromDb(user.id,req.params.id);
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