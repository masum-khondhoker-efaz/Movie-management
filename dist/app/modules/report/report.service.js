"use strict";
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
exports.reportService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const client_1 = require("@prisma/client");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createIntoDb = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const movie = yield prisma_1.default.movie.findUnique({
        where: {
            id: data.movieId,
        },
    });
    if (!movie) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Movie not found.');
    }
    const result = yield prisma_1.default.report.create({
        data: Object.assign(Object.assign({}, data), { reportedById: userId }),
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Report not created successfully');
    }
    return result;
});
const getListFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.report.findMany();
    if (result.length === 0) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Report not found');
    }
    return result;
});
const getByIdFromDb = (userId, reportId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.report.findUnique({
        where: {
            id: reportId,
        },
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Report not found');
    }
    return result;
});
const updateIntoDb = (userId, reportId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.report.update({
        where: {
            id: reportId,
            reportedById: userId,
        },
        data: {
            reason: data.reason,
        },
    });
    return result;
});
const deleteItemFromDb = (userId, reportId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedItem = yield prisma_1.default.report.delete({
        where: {
            id: reportId,
            reportedById: userId,
        },
    });
    return deletedItem;
});
const getListFromDbSpecificUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    if (user.status !== client_1.UserStatus.ACTIVE) {
        throw new AppError_1.default(http_status_1.default.FORBIDDEN, 'User is not active');
    }
    const result = yield prisma_1.default.report.findMany({
        where: {
            reportedById: userId,
        },
    });
    return result;
});
const updateIntoDbForAdmin = (userId, reportId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id: userId,
        },
    });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found');
    }
    const result = yield prisma_1.default.report.update({
        where: {
            id: reportId,
        },
        data: {
            reportStatus: client_1.ReportStatus.APPROVED || client_1.ReportStatus.REJECTED,
        },
    });
    return result;
});
exports.reportService = {
    createIntoDb,
    getListFromDb,
    getByIdFromDb,
    updateIntoDb,
    deleteItemFromDb,
    getListFromDbSpecificUser,
    updateIntoDbForAdmin,
};
