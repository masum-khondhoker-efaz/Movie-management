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
exports.ratingService = void 0;
const prisma_1 = __importDefault(require("../../utils/prisma"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_1 = __importDefault(require("http-status"));
const createRatingIntoDb = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    if (data.movieId) {
        const movie = yield prisma_1.default.movie.findUnique({
            where: {
                id: data.movieId,
            },
        });
        if (!movie) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Movie not found.');
        }
    }
    const existingRating = yield prisma_1.default.rating.findFirst({
        where: {
            userId: userId,
            movieId: data.movieId,
        },
    });
    if (existingRating) {
        const updatedRating = yield prisma_1.default.rating.update({
            where: {
                id: existingRating.id,
            },
            data: {
                rating: data.rating,
            },
        });
        if (!updatedRating) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Rating not updated successfully.');
        }
    }
    else {
        const result = yield prisma_1.default.rating.create({
            data: {
                userId: userId,
                movieId: data.movieId,
                rating: data.rating,
            },
        });
        if (!result) {
            throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Rating not created successfully.');
        }
    }
    const ratings = yield prisma_1.default.rating.findMany({
        where: {
            movieId: data.movieId,
        },
    });
    const totalRating = ratings.length;
    let avgRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / totalRating;
    const updatedMovie = yield prisma_1.default.movie.update({
        where: {
            id: data.movieId,
        },
        data: {
            avgRating,
            totalRating
        },
    });
    if (!updatedMovie) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Movie not updated successfully.');
    }
    return updatedMovie;
});
const getRatingListFromDb = (userId, movieId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.rating.findMany({
        where: {
            movieId: movieId,
        },
    });
    if (result.length === 0) {
        return { message: 'No ratings found for this movie.' };
    }
    return result;
});
const getRatingByIdFromDb = (userId, ratingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.rating.findUnique({
        where: {
            id: ratingId,
        }
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Rating not found');
    }
    return result;
});
const updateRatingIntoDb = (userId, ratingId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.rating.update({
        where: {
            id: ratingId,
            userId: userId,
        },
        data: {
            rating: data.rating,
        }
    });
    if (!result) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Rating not updated successfully.');
    }
    return result;
});
const deleteRatingItemFromDb = (userId, ratingId) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedItem = yield prisma_1.default.rating.delete({
        where: {
            id: ratingId,
            userId: userId,
        },
    });
    if (!deletedItem) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'Rating not deleted successfully.');
    }
    return deletedItem;
});
exports.ratingService = {
    createRatingIntoDb,
    getRatingListFromDb,
    getRatingByIdFromDb,
    updateRatingIntoDb,
    deleteRatingItemFromDb,
};
