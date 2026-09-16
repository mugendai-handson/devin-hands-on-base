#!/usr/bin/env bash
set -euo pipefail

sudo apt-get update
sudo apt-get install -y jq
cp -n .env.example .env || true
npm ci
