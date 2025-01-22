"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieValidation = void 0;
const zod_1 = require("zod");
const createSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Name is required'),
        description: zod_1.z.string(),
        duration: zod_1.z.string(),
        releasedAt: zod_1.z.string(),
        genre: zod_1.z.string().min(1, 'Genre is required'),
        language: zod_1.z.string().min(1, 'Language is required'),
    }),
});
const updateSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, 'Name is required'),
        description: zod_1.z.string(),
        duration: zod_1.z.string(),
        releasedAt: zod_1.z.string(),
        genre: zod_1.z.string().min(1, 'Genre is required'),
        language: zod_1.z.string().min(1, 'Language is required'),
        avgRating: zod_1.z.number().positive().optional(),
        totalRating: zod_1.z.number().int().positive().optional(),
    }),
});
exports.movieValidation = {
    createSchema,
    updateSchema,
};
