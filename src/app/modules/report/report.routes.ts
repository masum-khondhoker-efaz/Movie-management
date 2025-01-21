import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { reportController } from './report.controller';
import { reportValidation } from './report.validation';

const router = express.Router();

router.post(
'/',
auth(),
validateRequest(reportValidation.createSchema),
reportController.createReport,
);

router.get('/', auth(), reportController.getReportList);

router.get('/:id', auth(), reportController.getReportById);

router.put(
'/:id',
auth(),
validateRequest(reportValidation.updateSchema),
reportController.updateReport,
);

router.delete('/:id', auth(), reportController.deleteReport);

export const reportRoutes = router;