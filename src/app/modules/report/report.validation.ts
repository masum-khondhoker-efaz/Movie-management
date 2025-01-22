import { z } from 'zod';

const createSchema = z.object({
  body: z.object({
    reason: z.string(),
    movieId: z.string(),
  }),
});

const updateSchema = z.object({
  body: z.object({
    reason: z.string().optional(),
    movieId: z.string().optional(),
    reportStatus: z.string().optional(),
  }),
});

export const reportValidation = {
  createSchema,
  updateSchema,
};
