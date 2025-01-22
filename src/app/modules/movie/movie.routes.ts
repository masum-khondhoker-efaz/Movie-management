import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { movieController } from './movie.controller';
import { movieValidation } from './movie.validation';
import { UserRoleEnum } from '@prisma/client';

const router = express.Router();

router.post(
'/',
validateRequest(movieValidation.createSchema),
auth(UserRoleEnum.USER),
movieController.createMovie,
);

router.get('/', auth(), movieController.getMovieList);

router.get('/:id', auth(), movieController.getMovieById);

router.put(
'/:id',
validateRequest(movieValidation.updateSchema),
auth(UserRoleEnum.USER),
movieController.updateMovie,
);

router.delete('/:id', auth(UserRoleEnum.USER), movieController.deleteMovie);

export const MovieRoutes = router;