import { describe, it, expect, vi } from "vitest";
import { postRoutes } from "./post.route";

const mockItem = { id: "test-id-1", title: "test-value", body: "test-value", published: true, createdAt: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };

vi.mock("../services/post.service", () => ({
  listPost: vi.fn().mockResolvedValue({ items: [mockItem], total: 1, page: 1, pageSize: 20 }),
  getPostById: vi.fn().mockImplementation((id: string) =>
    Promise.resolve(id === "test-id-1" ? mockItem : null)
  ),
  createPost: vi.fn().mockResolvedValue(mockItem),
  updatePost: vi.fn().mockImplementation((id: string, data: unknown) =>
    Promise.resolve(id === "test-id-1" ? { ...mockItem, ...(data as object) } : null)
  ),
  deletePost: vi.fn().mockResolvedValue(undefined),
}));

describe("Post routes", () => {
  it("GET / → 200 with items", async () => {
    const res = await postRoutes.request("/");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.items).toHaveLength(1);
  });

  it("GET /:id → 200 when found", async () => {
    const res = await postRoutes.request("/test-id-1");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.id).toBe("test-id-1");
  });

  it("GET /:id → 404 when not found", async () => {
    const res = await postRoutes.request("/nonexistent");
    expect(res.status).toBe(404);
  });

  it("POST / → 201 with created item", async () => {
    const res = await postRoutes.request("/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "test-value", body: "test-value", published: true, createdAt: new Date().toISOString() }),
    });
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.id).toBe("test-id-1");
  });

  it("PATCH /:id → 200 when found", async () => {
    const res = await postRoutes.request("/test-id-1", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "test-value", body: "test-value", published: true, createdAt: new Date().toISOString() }),
    });
    expect(res.status).toBe(200);
  });

  it("PATCH /:id → 404 when not found", async () => {
    const res = await postRoutes.request("/nonexistent", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title: "test-value", body: "test-value", published: true, createdAt: new Date().toISOString() }),
    });
    expect(res.status).toBe(404);
  });

  it("DELETE /:id → 204", async () => {
    const res = await postRoutes.request("/test-id-1", { method: "DELETE" });
    expect(res.status).toBe(204);
  });
});
