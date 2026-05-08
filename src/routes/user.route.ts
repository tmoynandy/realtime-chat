import { Hono } from "hono";
import { validateUserBody, validateUserQuery } from "../validators/user.validator";
import * as service from "../services/user.service";

export const userRoutes = new Hono();

userRoutes.get("/", async (c) => {
  const q = validateUserQuery(c.req.query());
  return c.json(await service.listUser(q));
});

userRoutes.get("/:id", async (c) => {
  const item = await service.getUserById(c.req.param("id"));
  if (!item) return c.json({ error: "not found" }, 404);
  return c.json(item);
});

userRoutes.post("/", async (c) => {
  try {
    const data = validateUserBody(await c.req.json());
    const item = await service.createUser(data);
    return c.json(item, 201);
  } catch (err) {
    return c.json({ error: String(err) }, 400);
  }
});

userRoutes.patch("/:id", async (c) => {
  try {
    const data = validateUserBody(await c.req.json());
    const item = await service.updateUser(c.req.param("id"), data);
    if (!item) return c.json({ error: "not found" }, 404);
    return c.json(item);
  } catch (err) {
    return c.json({ error: String(err) }, 400);
  }
});

userRoutes.delete("/:id", async (c) => {
  await service.deleteUser(c.req.param("id"));
  return c.body(null, 204);
});
