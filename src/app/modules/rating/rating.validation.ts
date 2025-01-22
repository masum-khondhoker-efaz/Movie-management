import { z } from 'zod';

const createSchema = z.object({
  body: z.object({
    movieId: z.string().min(1, 'Name is required'),
    rating: z.number().int().min(1).max(5),
  }),
});

const updateSchema = z.object({
  body: z.object({
    movieId: z.string().min(1, 'Name is required').optional(),
    rating: z.number().int().min(1).max(5),
  }),
});

export const ratingValidation = {
  createSchema,
  updateSchema,
};
