import { PrismaClient } from "@prisma/client";
import type { PostInput } from "../validators/post.validator";

const prisma = new PrismaClient();

export async function findMany(opts: { page?: number; pageSize?: number; search?: string }) {
  const page = opts.page ?? 1;
  const pageSize = opts.pageSize ?? 20;
  const skip = (page - 1) * pageSize;
  const [items, total] = await Promise.all([
    prisma.post.findMany({ skip, take: pageSize }),
    prisma.post.count(),
  ]);
  return { items, total, page, pageSize };
}

export async function findById(id: string) {
  return prisma.post.findUnique({ where: { id } });
}

export async function create(data: PostInput) {
  return prisma.post.create({ data });
}

export async function update(id: string, data: Partial<PostInput>) {
  return prisma.post.update({ where: { id }, data }).catch(() => null);
}

export async function remove(id: string): Promise<void> {
  await prisma.post.delete({ where: { id } }).catch(() => null);
}
