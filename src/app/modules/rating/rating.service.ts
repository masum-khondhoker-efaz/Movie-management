import prisma from '../../utils/prisma';
import { UserRoleEnum, UserStatus } from '@prisma/client';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const createRatingIntoDb = async (
  userId: string,
  data: {
    movieId: string;
    rating: number;
  },
) => {

  if(data.movieId){
    const movie = await prisma.movie.findUnique({
      where: {
        id: data.movieId,
      },
    });
    if(!movie){
      throw new AppError(httpStatus.BAD_REQUEST, 'Movie not found.');
    }
  }
  const existingRating = await prisma.rating.findFirst({
    where: {
      userId: userId,
      movieId: data.movieId,
    },
  });

  if (existingRating) {
    const updatedRating = await prisma.rating.update({
      where: {
        id: existingRating.id,
      },
      data: {
        rating: data.rating,
      },
    });
    if (!updatedRating) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Rating not updated successfully.',
      );
    }
  } else {
    const result = await prisma.rating.create({
      data: {
        userId: userId,
        movieId: data.movieId,
        rating: data.rating,
      },
    });
    if (!result) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Rating not created successfully.',
      );
    }
  }

  
  const ratings = await prisma.rating.findMany({
    where: {
      movieId: data.movieId,
    },
  });
  
  const totalRating = ratings.length;
  let avgRating =
  ratings.reduce((acc, rating) => acc + rating.rating, 0) / totalRating;
  
  
  const updatedMovie = await prisma.movie.update({
    where: {
      id: data.movieId,
    },
    data: {
      avgRating,
      totalRating
    },
  });

  

  if (!updatedMovie) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Movie not updated successfully.',
    );
  }

  return updatedMovie;
};

const getRatingListFromDb = async (userId: string, movieId: string) => {
  const result = await prisma.rating.findMany({
    where: {
      movieId: movieId,
    },
  });

  if (result.length === 0) {
    return { message: 'No ratings found for this movie.' };
  }

  return result;
};

const getRatingByIdFromDb = async (userId: string, ratingId: string) => {
  const result = await prisma.rating.findUnique({
    where: { 
      id: ratingId,
    } 
  });
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND,'Rating not found');
  }
  return result;
};

const updateRatingIntoDb = async (userId: string, ratingId: string, data: any) => {
  const result = await prisma.rating.update({
    where: { 
      id: ratingId,
      userId: userId,
    },
    data : {
      rating: data.rating,
    }
  });
  if(!result) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Rating not updated successfully.');
    }
  return result;
};

const deleteRatingItemFromDb = async (userId: string, ratingId: string) => {
 

    const deletedItem = await prisma.rating.delete({
      where: { 
        id: ratingId,
        userId: userId,
      },
    });

    if (!deletedItem) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Rating not deleted successfully.');
    } 
    return deletedItem;
  };
  

export const ratingService = {
  createRatingIntoDb,
  getRatingListFromDb,
  getRatingByIdFromDb,
  updateRatingIntoDb,
  deleteRatingItemFromDb,
};
