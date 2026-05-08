import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { userRoutes } from "./routes/user.route";
import { postRoutes } from "./routes/post.route";

const app = new Hono();
app.get("/health", (c) => c.json({ ok: true }));
app.get("/users/:id", (c) => c.json({ ok: true, op: "GET /users/:id" }));
app.post("/users", (c) => c.json({ ok: true, op: "POST /users" }));
app.post("/auth/login", (c) => c.json({ ok: true, op: "POST /auth/login" }));
app.get("/health", (c) => c.json({ ok: true, op: "GET /health" }));
app.route("/users", userRoutes);
app.route("/posts", postRoutes);
const port = Number(process.env.PORT ?? 8080);
serve({ fetch: app.fetch, port });
console.log(`listening on ${port}`);
