"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const rating_controller_1 = require("./rating.controller");
const rating_validation_1 = require("./rating.validation");
const client_1 = require("@prisma/client");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(client_1.UserRoleEnum.USER), (0, validateRequest_1.default)(rating_validation_1.ratingValidation.createSchema), rating_controller_1.ratingController.createRating);
router.get('/movie-ratings/:id', (0, auth_1.default)(), rating_controller_1.ratingController.getRatingList);
router.get('/:id', (0, auth_1.default)(), rating_controller_1.ratingController.getRatingById);
router.put('/:id', (0, auth_1.default)(), (0, validateRequest_1.default)(rating_validation_1.ratingValidation.updateSchema), rating_controller_1.ratingController.updateRating);
router.delete('/:id', (0, auth_1.default)(client_1.UserRoleEnum.USER), rating_controller_1.ratingController.deleteRating);
exports.RatingRoutes = router;
