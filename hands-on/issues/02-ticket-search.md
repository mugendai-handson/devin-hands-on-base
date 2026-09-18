# [Feature] Ticketsをキーワードで検索できるようにする

## 背景 / 課題

Playbookなどを利用して別のIssueを処理するためのIssueです。Ticketが増えると、利用者が目的のTicketを一覧から見つけるのに時間がかかります。

## 要件

- Tickets一覧にSearch Inputを追加する
- Ticket Titleを検索対象にする
- Keywordに一致するTicketのみを表示する
- Searchを解除するとすべてのTicketを表示する

## Acceptance Criteria

- [ ] Tickets一覧にSearch Inputが表示される
- [ ] Ticket TitleをKeywordで検索できる
- [ ] 検索結果が0件でもUIが崩れない
- [ ] Searchを解除すると元の一覧が表示される
- [ ] 必要なTestが追加または更新される
- [ ] `npm run verify` が成功する
- [ ] 必要なE2E Testが成功する

## 制約 / 注意事項

- 既存機能を壊さない
- 既存のComponent / Design Patternを優先する
- 関係ないRefactoringを行わない
