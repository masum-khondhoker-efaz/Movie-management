import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { ratingService } from './rating.service';

const createRating = catchAsync(async (req, res) => {
  const result = await ratingService.createIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Rating created successfully',
    data: result,
  });
});

const getRatingList = catchAsync(async (req, res) => {
  const result = await ratingService.getListFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rating list retrieved successfully',
    data: result,
  });
});

const getRatingById = catchAsync(async (req, res) => {
  const result = await ratingService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rating details retrieved successfully',
    data: result,
  });
});

const updateRating = catchAsync(async (req, res) => {
  const result = await ratingService.updateIntoDb(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rating updated successfully',
    data: result,
  });
});

const deleteRating = catchAsync(async (req, res) => {
  const result = await ratingService.deleteItemFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rating deleted successfully',
    data: result,
  });
});

export const ratingController = {
  createRating,
  getRatingList,
  getRatingById,
  updateRating,
  deleteRating,
};