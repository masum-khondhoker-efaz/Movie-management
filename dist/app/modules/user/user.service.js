"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.email) {
        const existingUser = yield prisma_1.default.user.findFirst({
            where: {
                OR: [
                    {
                        email: payload.email,
                    },
                    {
                        fullName: payload.fullName,
                    },
                ],
            },
        });
        if (existingUser) {
            throw new AppError_1.default(http_status_1.default.CONFLICT, 'User already exists with this username or email!');
        }
    }
    if (!payload.password) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Password is required!');
    }
    const hashedPassword = yield bcrypt.hash(payload.password, Number(config_1.default.bcrypt_salt_rounds));
    const userData = Object.assign(Object.assign({}, payload), { password: hashedPassword, status: client_1.UserStatus.ACTIVE });
    const user = yield prisma_1.default.user.create({
        data: userData,
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User not created!');
    }
    const userWithoutPassword = Object.assign({}, user);
    delete userWithoutPassword.password;
    return userWithoutPassword;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.user.findMany({
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            status: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return result;
});
const getMyProfileFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Profile = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            id: id,
        },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return Profile;
});
const getUserDetailsFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUniqueOrThrow({
        where: { id },
        select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return user;
});
const updateMyProfileIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = payload;
    // Update user data
    const updatedUser = yield prisma_1.default.user.update({
        where: { id },
        data: userData,
    });
    if (!updatedUser) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'User not updated!');
    }
    const userWithoutPassword = Object.assign({}, updatedUser);
    delete userWithoutPassword.password;
    return userWithoutPassword;
});
const changePassword = (user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield prisma_1.default.user.findUniqueOrThrow({
        where: {
            email: user.email,
            status: client_1.UserStatus.ACTIVE,
        },
    });
    const isCorrectPassword = yield bcrypt.compare(payload.oldPassword, userData.password);
    if (!isCorrectPassword) {
        throw new Error('Password incorrect!');
    }
    const hashedPassword = yield bcrypt.hash(payload.newPassword, 12);
    yield prisma_1.default.user.update({
        where: {
            id: userData.id,
        },
        data: {
            password: hashedPassword,
        },
    });
    return {
        message: 'Password changed successfully!',
    };
});
exports.UserServices = {
    registerUserIntoDB,
    getAllUsersFromDB,
    getMyProfileFromDB,
    getUserDetailsFromDB,
    updateMyProfileIntoDB,
    changePassword,
};
