#!/usr/bin/env bash
set -euo pipefail

cp -n .env.example .env || true

wait_for_docker() {
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
  for _ in $(seq 1 30); do
    if docker compose exec -T postgres pg_isready -U issue_tracker >/dev/null 2>&1; then
      return 0
    fi
    sleep 2
  done

  echo "PostgreSQL did not become ready." >&2
  return 1
}

wait_for_app() {
  for _ in $(seq 1 60); do
    if curl -sf http://127.0.0.1:3000 >/dev/null; then
      return 0
    fi
    sleep 1
  done

  echo "Next.js did not become ready. See /tmp/next-dev.log." >&2
  return 1
}

wait_for_docker
docker compose up -d
wait_for_postgres
npm run db:migrate

user_count="$(
  docker compose exec -T postgres \
    psql -U issue_tracker -d issue_tracker -tAc 'SELECT COUNT(*) FROM "User";' \
    | tr -d '[:space:]'
)"

if [ "${user_count:-0}" = "0" ]; then
  npm run db:seed
fi

if ! curl -sf http://127.0.0.1:3000 >/dev/null; then
  nohup npm run dev >/tmp/next-dev.log 2>&1 &
fi

wait_for_app
