# [Feature] 不要なTicketを削除できるようにする

## 背景 / 課題

誤って作成したTicketや不要になったTicketを削除する手段がなく、利用者は一覧に残り続ける不要な情報を整理できません。

## 要件

- Ticket詳細から対象のTicketを削除できるようにする
- 誤操作を防ぐため、削除を確定する前に確認を求める
- 削除をキャンセルした場合はTicketを残す
- 削除完了後はTickets一覧へ移動する
- 存在しないTicketの削除や削除処理の失敗を安全に扱う

## Acceptance Criteria

- [ ] Ticket詳細に削除操作が表示される
- [ ] 確認後に対象のTicketだけが削除され、Tickets一覧へ移動する
- [ ] 削除をキャンセルするとTicketが残る
- [ ] 削除したTicketが一覧と集計から除外される
- [ ] 削除処理に失敗しても画面が壊れず、利用者に結果が伝わる
- [ ] 必要なTestが追加または更新される
- [ ] `npm run verify` が成功する
- [ ] 削除とキャンセルを確認するE2E Testが成功する

## 制約 / 注意事項

- 既存機能を壊さない
- 既存のComponent / Design Patternを優先する
- 関係ないRefactoringを行わない
- Hard Deleteとして扱い、削除したTicketの復元機能は今回のScopeに含めない
