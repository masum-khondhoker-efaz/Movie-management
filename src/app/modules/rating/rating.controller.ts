import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { ratingService } from './rating.service';

const createRating = catchAsync(async (req, res) => {
  const user = req.user as any;
  const result = await ratingService.createRatingIntoDb(user.id,req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Rating created successfully',
    data: result,
  });
});

const getRatingList = catchAsync(async (req, res) => {
  const user = req.user as any;
  const result = await ratingService.getRatingListFromDb(user.id, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rating list retrieved successfully',
    data: result,
  });
});

const getRatingById = catchAsync(async (req, res) => {
  const user = req.user as any;
  const result = await ratingService.getRatingByIdFromDb(user.id, req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rating details retrieved successfully',
    data: result,
  });
});

const updateRating = catchAsync(async (req, res) => {
  const user = req.user as any;
  const result = await ratingService.updateRatingIntoDb(user.id, req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Rating updated successfully',
    data: result,
  });
});

const deleteRating = catchAsync(async (req, res) => {
  const user = req.user as any;
  const result = await ratingService.deleteRatingItemFromDb(user.id, req.params.id);
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