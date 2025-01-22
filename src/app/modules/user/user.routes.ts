import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from '../user/user.validation';
import { UserControllers } from '../user/user.controller';
import { UserRoleEnum } from '@prisma/client';
const router = express.Router();

router.post(
  '/',
  validateRequest(UserValidations.registerUser),
  UserControllers.registerUser,
);

router.get('/', UserControllers.getAllUsers);

router.get('/me', auth(), UserControllers.getMyProfile);

router.get('/:id', UserControllers.getUserDetails);


router.put(
  '/',
  auth(),
  UserControllers.updateMyProfile,
);


router.put(
  '/change-password',
  auth(),
  UserControllers.changePassword,
);


export const UserRouters = router;
