import { Hono } from "hono";
import { validatePostBody, validatePostQuery } from "../validators/post.validator";
import * as service from "../services/post.service";

export const postRoutes = new Hono();

postRoutes.get("/", async (c) => {
  const q = validatePostQuery(c.req.query());
  return c.json(await service.listPost(q));
});

postRoutes.get("/:id", async (c) => {
  const item = await service.getPostById(c.req.param("id"));
  if (!item) return c.json({ error: "not found" }, 404);
  return c.json(item);
});

postRoutes.post("/", async (c) => {
  try {
    const data = validatePostBody(await c.req.json());
    const item = await service.createPost(data);
    return c.json(item, 201);
  } catch (err) {
    return c.json({ error: String(err) }, 400);
  }
});

postRoutes.patch("/:id", async (c) => {
  try {
    const data = validatePostBody(await c.req.json());
    const item = await service.updatePost(c.req.param("id"), data);
    if (!item) return c.json({ error: "not found" }, 404);
    return c.json(item);
  } catch (err) {
    return c.json({ error: String(err) }, 400);
  }
});

postRoutes.delete("/:id", async (c) => {
  await service.deletePost(c.req.param("id"));
  return c.body(null, 204);
});
