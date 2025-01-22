"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouters = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const user_validation_1 = require("../user/user.validation");
const user_controller_1 = require("../user/user.controller");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(user_validation_1.UserValidations.registerUser), user_controller_1.UserControllers.registerUser);
router.get('/', user_controller_1.UserControllers.getAllUsers);
router.get('/me', (0, auth_1.default)(), user_controller_1.UserControllers.getMyProfile);
router.get('/:id', user_controller_1.UserControllers.getUserDetails);
router.put('/', (0, auth_1.default)(), user_controller_1.UserControllers.updateMyProfile);
router.put('/change-password', (0, auth_1.default)(), user_controller_1.UserControllers.changePassword);
exports.UserRouters = router;
