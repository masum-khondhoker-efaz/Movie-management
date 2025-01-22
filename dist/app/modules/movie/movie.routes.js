"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const movie_controller_1 = require("./movie.controller");
const movie_validation_1 = require("./movie.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(movie_validation_1.movieValidation.createSchema), (0, auth_1.default)(client_1.UserRoleEnum.USER), movie_controller_1.movieController.createMovie);
router.get('/', (0, auth_1.default)(), movie_controller_1.movieController.getMovieList);
router.get('/:id', (0, auth_1.default)(), movie_controller_1.movieController.getMovieById);
router.put('/:id', (0, validateRequest_1.default)(movie_validation_1.movieValidation.updateSchema), (0, auth_1.default)(client_1.UserRoleEnum.USER), movie_controller_1.movieController.updateMovie);
router.delete('/:id', (0, auth_1.default)(client_1.UserRoleEnum.USER), movie_controller_1.movieController.deleteMovie);
exports.MovieRoutes = router;
