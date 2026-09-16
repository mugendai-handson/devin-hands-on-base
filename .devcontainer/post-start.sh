#!/usr/bin/env bash
set -euo pipefail

cp -n .env.example .env || true

wait_for_docker() {
  echo "Waiting for Docker."
  for _ in $(seq 1 30); do
    if docker info >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done

  echo "Docker did not become ready." >&2
  return 1
}

wait_for_postgres() {
  echo "Waiting for PostgreSQL on TCP 5432."
  for _ in $(seq 1 30); do
    if docker compose exec -T postgres pg_isready -h 127.0.0.1 -U issue_tracker >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done

  echo "PostgreSQL did not become ready." >&2
  return 1
}

app_is_listening() {
  local status
  status="$(curl -sS --connect-timeout 1 --max-time 2 -o /dev/null -w '%{http_code}' http://127.0.0.1:3000 || true)"
  [ -n "${status}" ] && [ "${status}" != "000" ]
}

wait_for_app() {
  echo "Waiting for http://127.0.0.1:3000."
  for _ in $(seq 1 90); do
    if app_is_listening; then
      return 0
    fi
    sleep 1
  done

  echo "Next.js did not become ready. See /tmp/next-dev.log." >&2
  return 1
}

apply_migrations() {
  echo "Applying migrations."
  for _ in $(seq 1 10); do
    if npm run db:migrate; then
      return 0
    fi
    sleep 2
  done

  echo "prisma migrate deploy failed." >&2
  return 1
}

wait_for_docker
echo "Starting PostgreSQL."
docker compose up -d
wait_for_postgres
apply_migrations

echo "Seeding an empty database."
npm run db:seed

if ! app_is_listening; then
  echo "Starting Next.js on port 3000. Logs: /tmp/next-dev.log"
  setsid nohup npm run dev -- --port 3000 >/tmp/next-dev.log 2>&1 </dev/null &
fi

wait_for_app
echo "App is ready at http://127.0.0.1:3000."
