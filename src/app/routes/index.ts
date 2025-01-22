import express from 'express';

import { MovieRoutes } from '../modules/movie/movie.routes';
import { RatingRoutes } from '../modules/rating/rating.routes';
import { ReportRoutes } from '../modules/report/report.routes';
import { AuthRouters } from '../modules/auth/auth.routes';
import { UserRouters } from '../modules/user/user.routes';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRouters,
  },
  {
    path: '/users',
    route: UserRouters,
  },
  {
    path: '/movies',
    route: MovieRoutes,
  },
  {
    path: '/ratings',
    route: RatingRoutes,
  },
  {
    path: '/reports',
    route: ReportRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
