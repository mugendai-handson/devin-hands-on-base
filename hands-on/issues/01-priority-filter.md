# [Feature] Tickets一覧をPriorityで絞り込めるようにする

## 背景 / 課題

通常のIssue Workflowを体験するためのIssueです。利用者が優先度の高いTicketに集中したい場合でも、現在はTickets一覧をPriorityで絞り込めません。

## 要件

- Tickets一覧にPriority Filterを追加する
- Repositoryに既に存在するPriorityから選択できるようにする
- 選択したPriorityのTicketのみを表示する
- Allを選択するとすべてのTicketを表示する

## Acceptance Criteria

- [ ] Tickets一覧にPriority Filterが表示される
- [ ] 選択したPriorityでTicketが正しく絞り込まれる
- [ ] Allを選択するとすべてのTicketが表示される
- [ ] 必要なTestが追加または更新される
- [ ] `npm run verify` が成功する
- [ ] 必要なE2E Testが成功する

## 制約 / 注意事項

- 既存機能を壊さない
- 既存のComponent / Design Patternを優先する
- 関係ないRefactoringを行わない
