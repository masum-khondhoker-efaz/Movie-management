import prisma from '../../utils/prisma';
import { UserRoleEnum, UserStatus, ReportStatus } from '@prisma/client';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createIntoDb = async (userId: string, data: any) => {
  const movie = await prisma.movie.findUnique({
    where: {
      id: data.movieId,
    },
  });
  if (!movie) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Movie not found.');
  }

  const result = await prisma.report.create({
    data: {
      ...data,
      reportedById: userId,
    },
  });

  if (!result) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Report not created successfully',
    );
  }

  return result;
};

const getListFromDb = async () => {
  const result = await prisma.report.findMany();
  if (result.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Report not found');
  }
  return result;
};

const getByIdFromDb = async (userId: string, reportId: string) => {
  const result = await prisma.report.findUnique({
    where: {
      id: reportId,
    },
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Report not found');
  }
  return result;
};

const updateIntoDb = async (userId: string, reportId: string, data: any) => {
  const result = await prisma.report.update({
    where: {
      id: reportId,
      reportedById: userId,
    },
    data: {
      reason: data.reason,
    },
  });
  return result;
};

const deleteItemFromDb = async (userId: string, reportId: string) => {
  const deletedItem = await prisma.report.delete({
    where: {
      id: reportId,
      reportedById: userId,
    },
  });

  return deletedItem;
};

const getListFromDbSpecificUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  if (user.status !== UserStatus.ACTIVE) {
    throw new AppError(httpStatus.FORBIDDEN, 'User is not active');
  }

  const result = await prisma.report.findMany({
    where: {
      reportedById: userId,
    },
  });
  return result;
};

const updateIntoDbForAdmin = async (
  userId: string,
  reportId: string,
  data: any,
) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found');
  }

  const result = await prisma.report.update({
    where: {
      id: reportId,
    },
    data: {
      reportStatus: ReportStatus.APPROVED || ReportStatus.REJECTED,
    },
  });
  return result;
};

export const reportService = {
  createIntoDb,
  getListFromDb,
  getByIdFromDb,
  updateIntoDb,
  deleteItemFromDb,
  getListFromDbSpecificUser,
  updateIntoDbForAdmin,
};
