import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { ratingController } from './rating.controller';
import { ratingValidation } from './rating.validation';

const router = express.Router();

router.post(
'/',
auth(),
validateRequest(ratingValidation.createSchema),
ratingController.createRating,
);

router.get('/', auth(), ratingController.getRatingList);

router.get('/:id', auth(), ratingController.getRatingById);

router.put(
'/:id',
auth(),
validateRequest(ratingValidation.updateSchema),
ratingController.updateRating,
);

router.delete('/:id', auth(), ratingController.deleteRating);

export const ratingRoutes = router;