#!/usr/bin/env bash

set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
current_title="GitHub CLIの認証確認"

on_error() {
  printf 'Error: "%s" の処理中に失敗しました（line %s）。\n' \
    "$current_title" "$1" >&2
}
trap 'on_error "$LINENO"' ERR

titles=(
  "[Feature] Tickets一覧をPriorityで絞り込めるようにする"
  "[Feature] Ticketsをキーワードで検索できるようにする"
  "[Feature] DashboardにPriority別のTicket件数を表示する"
  "[Improvement] Projects一覧にProject数を表示する"
  "[Maintenance] Repositoryの検証を実行して問題を修正する"
  "[Feature] Tickets一覧にProjectを表示する"
  "[Feature] Tickets一覧の並び順を変更できるようにする"
  "[Feature] 不要なTicketを削除できるようにする"
  "[Feature] ProjectごとのTicket一覧を確認できるようにする"
  "[Feature] Ticketにコメントを追加できるようにする"
)

body_files=(
  "issues/01-priority-filter.md"
  "issues/02-ticket-search.md"
  "issues/03-dashboard-improvement.md"
  "issues/04-slack-task.md"
  "issues/05-automation-task.md"
  "issues/06-project-column.md"
  "issues/07-ticket-sorting.md"
  "issues/08-delete-ticket.md"
  "issues/09-project-detail.md"
  "issues/10-ticket-comments.md"
)

printf 'GitHub CLIの認証状態を確認します。\n'
gh auth status

current_title="既存Issueの確認"
existing_titles="$(
  gh issue list \
    --state all \
    --limit 1000 \
    --json title \
    --template '{{range .}}{{printf "%s\n" .title}}{{end}}'
)"

created_count=0
skipped_count=0

for index in "${!titles[@]}"; do
  current_title="${titles[$index]}"
  body_file="${script_dir}/${body_files[$index]}"

  if [[ ! -f "$body_file" ]]; then
    printf 'Error: Issue本文が見つかりません: %s\n' "$body_file" >&2
    exit 1
  fi

  if printf '%s\n' "$existing_titles" | grep -Fqx -- "$current_title"; then
    printf 'Skip: 同名Issueが既に存在します: %s\n' "$current_title"
    skipped_count=$((skipped_count + 1))
    continue
  fi

  printf 'Create: %s\n' "$current_title"
  issue_url="$(
    gh issue create \
      --title "$current_title" \
      --body-file "$body_file"
  )"
  printf 'Created: %s\n' "$issue_url"

  existing_titles="${existing_titles}"$'\n'"${current_title}"
  created_count=$((created_count + 1))
done

printf '\n完了: %s件作成、%s件スキップ\n' "$created_count" "$skipped_count"
printf '現在のIssue一覧:\n'
current_title="Issue一覧の表示"
gh issue list --state all --limit 100
