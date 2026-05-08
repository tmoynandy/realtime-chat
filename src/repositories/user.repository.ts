import { PrismaClient } from "@prisma/client";
import type { UserInput } from "../validators/user.validator";

const prisma = new PrismaClient();

export async function findMany(opts: { page?: number; pageSize?: number; search?: string }) {
  const page = opts.page ?? 1;
  const pageSize = opts.pageSize ?? 20;
  const skip = (page - 1) * pageSize;
  const [items, total] = await Promise.all([
    prisma.user.findMany({ skip, take: pageSize }),
    prisma.user.count(),
  ]);
  return { items, total, page, pageSize };
}

export async function findById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function create(data: UserInput) {
  return prisma.user.create({ data });
}

export async function update(id: string, data: Partial<UserInput>) {
  return prisma.user.update({ where: { id }, data }).catch(() => null);
}

export async function remove(id: string): Promise<void> {
  await prisma.user.delete({ where: { id } }).catch(() => null);
}
