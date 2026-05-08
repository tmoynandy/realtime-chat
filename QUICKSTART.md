# Quickstart — realtime-chat

Zero to running server in under 5 minutes.

## Prerequisites

- [Node.js 22+](https://nodejs.org/)
- [npm 10+](https://www.npmjs.com/) (bundled with Node)
- [Docker](https://docs.docker.com/get-docker/) (optional, for running dependencies)

---

## Step 1: Unzip and enter the project

```bash
unzip realtime-chat.zip
cd realtime-chat
```

---

## Step 2: Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in the following values:

| Variable | Example | Notes |
| --- | --- | --- |
| `APP_NAME` | `realtime-chat` | Application name shown in logs |
| `PORT` | `8080` | Port the server listens on |
| `DATABASE_URL` | `postgres://user:pass@localhost:5432/realtime-chat` | Connection string for your PostgreSQL database |
| `REDIS_URL` | `redis://localhost:6379` | Redis connection URL. For Upstash, get from the Upstash console |
| `NATS_URL` | `nats://localhost:4222` | NATS server URL |
| `DATABASE_URL` | `change-me` | Custom variable |
| `REDIS_URL` | `redis://cache:6379` | Custom variable |
| `JWT_SECRET` | `change-me` | Custom variable |
| `LOG_LEVEL` | `info` | Custom variable |

---

## Step 3: Start dependencies

```bash
docker compose up -d db cache nats
```

---

## Step 4: Run database migrations

```bash
npx prisma migrate dev
```

---

## Step 5: Start the development server

```bash
npm run dev
```

The server will be available at **http://localhost:8080**.

---

## Step 6: Test the API

```bash
curl http://localhost:8080/health
```

Expected response: `{"status":"ok"}`

---

## Troubleshooting

**Port 8080 already in use**
Change `PORT` in your `.env` file, or find and stop the conflicting process:
```bash
lsof -i :8080
kill -9 <PID>
```

**Database connection refused**
Make sure the database container is running: `docker compose ps`
If it exited, check logs: `docker compose logs db`

**`DATABASE_URL` not found / missing env variable**
Run `cp .env.example .env` and verify all required variables are set. The server will not start with missing required env vars.

**Dependency install errors**
Delete `node_modules` and `package-lock.json`, then run `npm install` again.
