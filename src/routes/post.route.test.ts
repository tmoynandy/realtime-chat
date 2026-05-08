import { describe, it, expect, beforeEach } from "vitest";
import { Test, TestingModule } from "@nestjs/testing";
import { PostController } from "./post.controller";
import { PostNestService } from "./post.service";

const mockItem = { id: "test-id-1", title: "test-value", body: "test-value", published: true, createdAt: new Date().toISOString(), createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() };

describe("PostController", () => {
  let controller: PostController;
  const mockService = {
    list: vi.fn().mockResolvedValue({ items: [mockItem], total: 1, page: 1, pageSize: 20 }),
    getById: vi.fn().mockImplementation((id: string) =>
      Promise.resolve(id === "test-id-1" ? mockItem : null)
    ),
    create: vi.fn().mockImplementation((dto: unknown) => Promise.resolve({ id: "test-id-1", ...(dto as object) })),
    update: vi.fn().mockImplementation((id: string, dto: unknown) => Promise.resolve({ id, ...(dto as object) })),
    remove: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostController],
      providers: [{ provide: PostNestService, useValue: mockService }],
    }).compile();
    controller = module.get<PostController>(PostController);
  });

  it("list returns paginated result", async () => {
    const result = await controller.list({});
    expect(result).toHaveProperty("items");
  });

  it("getById returns item", async () => {
    const result = await controller.getById("test-id-1");
    expect(result).toHaveProperty("id");
  });

  it("create returns new item", async () => {
    const result = await controller.create({ title: "test-value", body: "test-value", published: true, createdAt: new Date().toISOString() } as unknown);
    expect(result).toHaveProperty("id");
  });

  it("update returns updated item", async () => {
    const result = await controller.update("test-id-1", { title: "test-value", body: "test-value", published: true, createdAt: new Date().toISOString() } as unknown);
    expect(result).toHaveProperty("id");
  });

  it("remove returns void", async () => {
    const result = await controller.remove("test-id-1");
    expect(result).toBeUndefined();
  });
});
