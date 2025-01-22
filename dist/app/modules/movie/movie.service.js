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
exports.movieService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createMovieIntoDb = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.movie.create({
        data: {
            title: data.title,
            description: data.description,
            releasedAt: new Date(data.releasedAt),
            language: data.language,
            genre: data.genre,
            duration: data.duration,
            createdById: userId,
        }
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Movie not created successfully!');
    }
    return result;
});
const getMovieListFromDb = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.movie.findMany();
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Movies not found.');
    }
    return result;
});
const getMovieByIdFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.movie.findUnique({ where: { id } });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Movie not found');
    }
    return result;
});
const updateMovieIntoDb = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.movie.update({
        where: { id },
        data,
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_MODIFIED, 'Movie not updated successfully.');
    }
    return result;
});
const deleteMovieItemFromDb = (userId, id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedItem = yield prisma_1.default.movie.delete({
        where: {
            id: id,
            createdById: userId
        },
    });
    return deletedItem;
});
;
exports.movieService = {
    createMovieIntoDb,
    getMovieListFromDb,
    getMovieByIdFromDb,
    updateMovieIntoDb,
    deleteMovieItemFromDb,
};
