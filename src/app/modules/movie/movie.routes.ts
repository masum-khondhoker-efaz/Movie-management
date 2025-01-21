import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { movieController } from './movie.controller';
import { movieValidation } from './movie.validation';

const router = express.Router();

router.post(
'/',
auth(),
validateRequest(movieValidation.createSchema),
movieController.createMovie,
);

router.get('/', auth(), movieController.getMovieList);

router.get('/:id', auth(), movieController.getMovieById);

router.put(
'/:id',
auth(),
validateRequest(movieValidation.updateSchema),
movieController.updateMovie,
);

router.delete('/:id', auth(), movieController.deleteMovie);

export const movieRoutes = router;