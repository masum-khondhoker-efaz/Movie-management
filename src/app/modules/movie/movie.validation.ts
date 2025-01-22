import { z } from 'zod';

const createSchema = z.object({

    title: z.string().min(1, 'Name is required'),
    description: z.string(),
    duration: z.number().int().positive(),
    releaseDate: z.date(),
    genre: z.string().min(1, 'Genre is required'),
    language: z.string().min(1, 'Language is required'),

});

const updateSchema = z.object({

    title: z.string().min(1, 'Name is required'),
    description: z.string(),
    duration: z.string(),
    releaseDate: z.string(),
    genre: z.string().min(1, 'Genre is required'),
    language: z.string().min(1, 'Language is required'),
    avgRating: z.number().positive().optional(),
    totalRating: z.number().int().positive().optional(),

});

export const movieValidation = {
createSchema,
updateSchema,
};