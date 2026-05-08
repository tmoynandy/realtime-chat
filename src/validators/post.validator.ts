import { z } from "zod";

const PostSchema = z.object({
  title: z.string().min(1),
  body: z.string(),
  published: z.boolean(),
  createdAt: z.string().datetime(),
});

export type PostInput = z.infer<typeof PostSchema>;

export function validatePostBody(data: unknown): PostInput {
  return PostSchema.parse(data);
}

export function validatePostQuery(data: unknown) {
  return z.object({
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().max(100).optional(),
    search: z.string().optional(),
  }).parse(data);
}
