import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { reportController } from './report.controller';
import { reportValidation } from './report.validation';
import { UserRoleEnum } from '@prisma/client';

const router = express.Router();

router.post(
'/',
validateRequest(reportValidation.createSchema),
auth(UserRoleEnum.USER),
reportController.createReport,
);

router.get('/', auth(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN), reportController.getReportList);

router.get('/user-reports', auth(UserRoleEnum.USER), reportController.getReportListSpecificUser);

router.get('/:id', auth(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN), reportController.getReportById);

router.put(
'/:id',
validateRequest(reportValidation.updateSchema),
auth(UserRoleEnum.USER),
reportController.updateReport,
);
router.put(
'/admin/:id',
validateRequest(reportValidation.updateSchema),
auth(UserRoleEnum.SUPER_ADMIN, UserRoleEnum.ADMIN),
reportController.updateReportForAdmin,
);

router.delete('/:id', auth(UserRoleEnum.USER), reportController.deleteReport);

export const ReportRoutes = router;