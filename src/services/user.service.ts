import * as repo from "../repositories/user.repository";
import type { UserInput } from "../validators/user.validator";

export async function listUser(q: { page?: number; pageSize?: number; search?: string }) {
  return repo.findMany(q);
}

export async function getUserById(id: string) {
  return repo.findById(id);
}

export async function createUser(data: UserInput) {
  return repo.create(data);
}

export async function updateUser(id: string, data: Partial<UserInput>) {
  return repo.update(id, data);
}

export async function deleteUser(id: string): Promise<void> {
  return repo.remove(id);
}
