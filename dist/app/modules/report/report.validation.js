"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportValidation = void 0;
const zod_1 = require("zod");
const createSchema = zod_1.z.object({
    body: zod_1.z.object({
        reason: zod_1.z.string(),
        movieId: zod_1.z.string(),
    }),
});
const updateSchema = zod_1.z.object({
    body: zod_1.z.object({
        reason: zod_1.z.string().optional(),
        movieId: zod_1.z.string().optional(),
        reportStatus: zod_1.z.string().optional(),
    }),
});
exports.reportValidation = {
    createSchema,
    updateSchema,
};
