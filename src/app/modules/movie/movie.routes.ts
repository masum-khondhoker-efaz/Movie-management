import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { movieController } from './movie.controller';
import { movieValidation } from './movie.validation';
import { UserRoleEnum } from '@prisma/client';

const router = express.Router();

router.post(
'/',
auth(UserRoleEnum.USER),
validateRequest(movieValidation.createSchema),
movieController.createMovie,
);

router.get('/', auth(), movieController.getMovieList);

router.get('/:id', auth(), movieController.getMovieById);

router.put(
'/:id',
auth(UserRoleEnum.USER),
validateRequest(movieValidation.updateSchema),
movieController.updateMovie,
);

router.delete('/:id', auth(UserRoleEnum.USER), movieController.deleteMovie);

export const movieRoutes = router;