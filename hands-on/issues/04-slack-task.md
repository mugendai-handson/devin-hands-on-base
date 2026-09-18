# [Improvement] Projects一覧にProject数を表示する

## 背景 / 課題

SlackからDevinへ依頼するHands-onで使用するIssueです。Projectsページでは個々のProjectは確認できますが、Workspace全体のProject数をすぐに把握できません。

## 要件

- ProjectsページにProject総件数を表示する
- 既存ページのDesign Patternに合わせる
- Projectが存在しない場合も正しい件数を表示する

## Acceptance Criteria

- [ ] Projectsページに正しいProject総件数が表示される
- [ ] Projectが0件の場合も正しく表示される
- [ ] 必要なTestが追加または更新される
- [ ] `npm run verify` が成功する

## 制約 / 注意事項

- 既存機能を壊さない
- 既存のComponent / Design Patternを優先する
- 関係ないRefactoringを行わない
