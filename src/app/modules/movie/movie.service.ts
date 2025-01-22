import prisma from '../../utils/prisma';
import { UserRoleEnum, UserStatus } from '@prisma/client';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';


const createMovieIntoDb = async (userId: string, data: {
    title: string;
    description: string;
    releasedAt: string;
    language: string;
    genre: string;
    duration: string;
}) => {
    const result = await prisma.movie.create({ 
      data : {
        title: data.title,
        description: data.description,
        releasedAt: new Date(data.releasedAt),
        language: data.language,
        genre: data.genre,
        duration: data.duration,
        createdById: userId,
      }
      
    });
    if(!result){
      throw new AppError(httpStatus.BAD_REQUEST, 'Movie not created successfully!')
    }
    return result;
  }
  


const getMovieListFromDb = async () => {
  
    const result = await prisma.movie.findMany();
    if(!result){
      throw new AppError(httpStatus.NOT_FOUND, 'Movies not found.')
    }
    return result;
};

const getMovieByIdFromDb = async (id: string) => {
  
    const result = await prisma.movie.findUnique({ where: { id } });
    if (!result) {
      throw new AppError(httpStatus.NOT_FOUND,'Movie not found');
    }
    return result;
  };



const updateMovieIntoDb = async (id: string, data: any) => {
    const result = await prisma.movie.update({
      where: { id },
      data,
    });
    if(!result){
      throw new AppError(httpStatus.NOT_MODIFIED,'Movie not updated successfully.')
    }
    return result;
 
};

const deleteMovieItemFromDb = async (userId: string, id: string) => {
    const deletedItem = await prisma.movie.delete({
      where: { 
        id: id,
        createdById: userId
       },
    });

    return deletedItem;
  
};
;

export const movieService = {
createMovieIntoDb,
getMovieListFromDb,
getMovieByIdFromDb,
updateMovieIntoDb,
deleteMovieItemFromDb,
};