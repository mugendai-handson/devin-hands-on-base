# [Feature] Tickets一覧にProjectを表示する

## 背景 / 課題

現在のTickets一覧では、各TicketがどのProjectに属するかを詳細画面へ移動しないと確認できません。複数Projectの作業を横断して確認する利用者が、一覧上でTicketの所属先を判断できるようにします。

## 要件

- Tickets一覧の各Ticketに所属Project名を表示する
- 既存のTicket情報と同じ一覧上で確認できるようにする
- 一覧からTicket詳細へ移動する既存の操作を維持する

## Acceptance Criteria

- [ ] Tickets一覧の各行に正しいProject名が表示される
- [ ] Projectが異なる複数のTicketを正しく判別できる
- [ ] Ticketが0件でも一覧のUIが崩れない
- [ ] 必要なTestが追加または更新される
- [ ] `npm run verify` が成功する
- [ ] 必要なE2E Testが成功する

## 制約 / 注意事項

- 既存機能を壊さない
- 既存のComponent / Design Patternを優先する
- 関係ないRefactoringを行わない
