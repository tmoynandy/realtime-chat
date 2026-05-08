# Deploy to Railway

## Prerequisites

- [Railway CLI](https://docs.railway.app/develop/cli): `npm i -g @railway/cli`
- A Railway account

## Steps

### 1. Login and initialise

```bash
railway login
railway link
```

### 2. Add a Postgres plugin (if needed)

In the Railway dashboard, open your project → **New** → **Database** → **PostgreSQL**.
Copy the `DATABASE_URL` it generates and set it in the next step.

### 3. Set environment variables

```bash
railway variables set APP_NAME=<value>
railway variables set PORT=<value>
railway variables set DATABASE_URL=<value>
railway variables set REDIS_URL=<value>
railway variables set NATS_URL=<value>
railway variables set DATABASE_URL=<value>
railway variables set REDIS_URL=<value>
railway variables set JWT_SECRET=<value>
railway variables set LOG_LEVEL=<value>
```

### 4. Deploy

```bash
railway up
```

Railway auto-detects the Dockerfile and builds it.

### 5. Open the deployed service

```bash
railway open
```

## Notes

- Railway uses the `PORT` env var automatically — make sure your app reads it.
- Run `railway logs` to tail live logs.
