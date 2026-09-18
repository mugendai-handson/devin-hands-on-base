# [Feature] ProjectごとのTicket一覧を確認できるようにする

## 背景 / 課題

Projects一覧ではProject名とTicket件数は確認できますが、どのTicketが所属しているかは確認できません。利用者がProjectを起点に作業状況を把握できるようにします。

## 要件

- Projects一覧から各Projectの詳細へ移動できる
- Project詳細にProject名と所属するTicketの総件数を表示する
- Project詳細に所属するTicketだけを一覧表示する
- ProjectにTicketがない場合は空であることが分かる表示にする
- 存在しないProjectを指定した場合はNot Foundとして扱う

## Acceptance Criteria

- [ ] Projects一覧から選択したProject詳細へ移動できる
- [ ] Project詳細に正しいProject名とTicket総件数が表示される
- [ ] 選択したProjectに所属するTicketだけが表示される
- [ ] 表示されたTicketから既存のTicket詳細へ移動できる
- [ ] Ticketが0件のProjectでもUIが崩れず、空であることを確認できる
- [ ] 存在しないProjectのURLではNot Foundが表示される
- [ ] 必要なTestが追加または更新される
- [ ] `npm run verify` が成功する
- [ ] ProjectからTicketを確認するE2E Testが成功する

## 制約 / 注意事項

- 既存機能を壊さない
- 既存のComponent / Design Patternを優先する
- 関係ないRefactoringを行わない
- Projectの作成・編集・削除は今回のScopeに含めない
