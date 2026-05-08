import { z } from "zod";

const UserSchema = z.object({
  email: z.string().min(1),
  name: z.string().min(1),
  createdAt: z.string().datetime(),
});

export type UserInput = z.infer<typeof UserSchema>;

export function validateUserBody(data: unknown): UserInput {
  return UserSchema.parse(data);
}

export function validateUserQuery(data: unknown) {
  return z.object({
    page: z.coerce.number().int().positive().optional(),
    pageSize: z.coerce.number().int().positive().max(100).optional(),
    search: z.string().optional(),
  }).parse(data);
}
