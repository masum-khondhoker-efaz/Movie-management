import prisma from '../../utils/prisma';
import { UserRoleEnum, UserStatus } from '@prisma/client';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';


const createRatingIntoDb = async (userId: string, data: {
  movieId: string,
  rating: number
}) => {
    const result = await prisma.rating.create({ 
      data :{
        userId: userId,
        movieId: data.movieId,
        rating: data.rating
      }
     });
     if(!result){
      throw new AppError(httpStatus.BAD_REQUEST, 'Rating not created successfully.')
     }
    return result;
  
};

const getRatingListFromDb = async (userId: string, movieId: string) => {
  const result = await prisma.rating.findMany({
    where: {
    movieId: movieId
    }
  });

  if (result.length === 0) {
    return { message: 'No ratings found for this movie.' };
  }

  return result;
};

const getRatingByIdFromDb = async (id: string) => {
  
    const result = await prisma.rating.findUnique({ where: { id } });
    if (!result) {
      throw new Error('Rating not found');
    }
    return result;
  };



const updateRatingIntoDb = async (id: string, data: any) => {
  const transaction = await prisma.$transaction(async (prisma) => {
    const result = await prisma.rating.update({
      where: { id },
      data,
    });
    return result;
  });

  return transaction;
};

const deleteRatingItemFromDb = async (id: string) => {
  const transaction = await prisma.$transaction(async (prisma) => {
    const deletedItem = await prisma.rating.delete({
      where: { id },
    });

    // Add any additional logic if necessary, e.g., cascading deletes
    return deletedItem;
  });

  return transaction;
};
;

export const ratingService = {
createRatingIntoDb,
getRatingListFromDb,
getRatingByIdFromDb,
updateRatingIntoDb,
deleteRatingItemFromDb,
};