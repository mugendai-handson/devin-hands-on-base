# [Feature] DashboardにPriority別のTicket件数を表示する

## 背景 / 課題

Ask DevinのDeep Modeなどで、複数Layerにまたがる影響調査を体験するためのIssueです。現在のDashboardではStatus別の件数は確認できますが、Priority別の状況を把握できません。

## 要件

- DashboardにPriorityごとのTicket件数を表示する
- Repositoryに存在するPriority定義を利用する
- 既存DashboardのDesign Patternに合わせる
- 該当するTicketが0件のPriorityも正しく表示する

## Acceptance Criteria

- [ ] DashboardにPriorityごとのTicket件数が表示される
- [ ] 表示される件数が保存済みのTicketと一致する
- [ ] 0件のPriorityがあっても表示が崩れない
- [ ] 既存DashboardにRegressionがない
- [ ] 必要なTestが追加または更新される
- [ ] `npm run verify` が成功する

## 制約 / 注意事項

- 既存機能を壊さない
- 既存のComponent / Design Patternを優先する
- 関係ないRefactoringを行わない
