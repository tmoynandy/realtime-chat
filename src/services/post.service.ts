import * as repo from "../repositories/post.repository";
import type { PostInput } from "../validators/post.validator";

export async function listPost(q: { page?: number; pageSize?: number; search?: string }) {
  return repo.findMany(q);
}

export async function getPostById(id: string) {
  return repo.findById(id);
}

export async function createPost(data: PostInput) {
  return repo.create(data);
}

export async function updatePost(id: string, data: Partial<PostInput>) {
  return repo.update(id, data);
}

export async function deletePost(id: string): Promise<void> {
  return repo.remove(id);
}
