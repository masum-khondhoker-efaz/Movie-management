"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingValidation = void 0;
const zod_1 = require("zod");
const createSchema = zod_1.z.object({
    body: zod_1.z.object({
        movieId: zod_1.z.string().min(1, 'Name is required'),
        rating: zod_1.z.number().int().min(1).max(5),
    }),
});
const updateSchema = zod_1.z.object({
    body: zod_1.z.object({
        movieId: zod_1.z.string().min(1, 'Name is required').optional(),
        rating: zod_1.z.number().int().min(1).max(5),
    }),
});
exports.ratingValidation = {
    createSchema,
    updateSchema,
};
