"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_routes_1 = require("../modules/movie/movie.routes");
const rating_routes_1 = require("../modules/rating/rating.routes");
const report_routes_1 = require("../modules/report/report.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const user_routes_1 = require("../modules/user/user.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_routes_1.AuthRouters,
    },
    {
        path: '/users',
        route: user_routes_1.UserRouters,
    },
    {
        path: '/movies',
        route: movie_routes_1.MovieRoutes,
    },
    {
        path: '/ratings',
        route: rating_routes_1.RatingRoutes,
    },
    {
        path: '/reports',
        route: report_routes_1.ReportRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
