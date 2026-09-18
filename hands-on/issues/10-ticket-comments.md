# [Feature] Ticketにコメントを追加できるようにする

## 背景 / 課題

TicketのDescriptionだけでは、調査結果や対応中の補足情報を時系列で残せません。利用者がTicketに関する経緯を一か所で共有できるようにします。

## 要件

- Ticket詳細にコメント一覧とコメント追加フォームを表示する
- コメント投稿者を既存のUserから選択できる
- コメントには投稿者、本文、投稿日時を記録する
- 空白だけのコメントや長すぎるコメントは保存しない
- コメントを投稿日時の古い順に表示する
- 新しいコメントを追加した後、同じTicketの一覧へ反映する
- Ticketごとにコメントを分離し、他のTicketには表示しない

## Acceptance Criteria

- [ ] Ticket詳細にコメント一覧とコメント追加フォームが表示される
- [ ] 投稿者と本文を指定してコメントを追加できる
- [ ] 空白だけのコメントと上限を超えるコメントがValidation Errorになる
- [ ] コメントに正しい投稿者名、本文、投稿日時が表示される
- [ ] 複数のコメントが投稿日時の古い順に表示される
- [ ] コメントは対象Ticketだけに表示される
- [ ] コメントが0件でもTicket詳細のUIが崩れない
- [ ] Databaseを新規に準備した場合も必要なData Modelが適用される
- [ ] 必要なBusiness Logic TestとData Accessに関するTestが追加または更新される
- [ ] `npm run verify` が成功する
- [ ] コメント投稿とValidationを確認するE2E Testが成功する

## 制約 / 注意事項

- 既存機能を壊さない
- 既存のComponent / Design Patternを優先する
- 関係ないRefactoringを行わない
- コメントの編集・削除、通知、メンション、添付ファイルは今回のScopeに含めない
- Authenticationや外部Serviceは追加しない
