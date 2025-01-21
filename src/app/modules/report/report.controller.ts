import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import { reportService } from './report.service';

const createReport = catchAsync(async (req, res) => {
  const result = await reportService.createIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Report created successfully',
    data: result,
  });
});

const getReportList = catchAsync(async (req, res) => {
  const result = await reportService.getListFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Report list retrieved successfully',
    data: result,
  });
});

const getReportById = catchAsync(async (req, res) => {
  const result = await reportService.getByIdFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Report details retrieved successfully',
    data: result,
  });
});

const updateReport = catchAsync(async (req, res) => {
  const result = await reportService.updateIntoDb(req.params.id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Report updated successfully',
    data: result,
  });
});

const deleteReport = catchAsync(async (req, res) => {
  const result = await reportService.deleteItemFromDb(req.params.id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Report deleted successfully',
    data: result,
  });
});

export const reportController = {
  createReport,
  getReportList,
  getReportById,
  updateReport,
  deleteReport,
};