---
title: SQL 學習第八步 DML 全攻略：INSERT、UPDATE、DELETE 的安全與技巧
tags:
  - SQL
  - 新手
  - SQL 系列一
series:
  - SQL初學
seriesorder: 8
---

在你已經熟悉查詢資料（SELECT）後，下一步就是學會如何對資料進行新增、修改、刪除。這些操作雖然簡單，但在真實系統中卻關係到資料的完整性與安全性。今天我們就把 DML（Data Manipulation Language）一次學透。

## 🔹 DML 是什麼？

DML（資料操作語句）負責對資料進行增（INSERT）、改（UPDATE）、刪（DELETE）。不同於 DDL（資料定義語句）是管理資料表結構，DML 主要影響表中的行內容。

### 1️⃣ INSERT INTO — 新增資料

單筆插入

```sql
INSERT INTO users (name, email, created\_at)

VALUES ('Alice', 'alice\@example.com', NOW());
```
📌 小技巧：

建議指定欄位名稱，避免因表結構變更導致錯位。

NOW() 可自動插入當前時間。

多筆插入

```sql
INSERT INTO users (name, email, created\_at)

VALUES

('Bob', 'bob\@example.com', NOW()),

('Charlie', 'charlie\@example.com', NOW());
```
💡 多筆一次插入比多次單筆插入效能更好。

### 2️⃣ UPDATE — 修改資料

```sql


UPDATE users

SET email = 'alice\_new\@example.com'

WHERE name = 'Alice';
```
⚠ 安全提醒：

一定要加 WHERE 條件，否則會更新全表。

可以先用 SELECT 測試條件：

```sql
SELECT \* FROM users WHERE name = 'Alice';
```
### 3️⃣ DELETE — 刪除資料

```sql

DELETE FROM users

WHERE name = 'Bob';
```
⚠ 刪除安全守則：

永遠先 SELECT 確認條件。

若可能後悔，先用「軟刪除」：

```sql
UPDATE users SET deleted\_at = NOW() WHERE name = 'Bob';
```
（再透過 WHERE deleted\_at IS NULL 過濾）

## 🛠 真實應用技巧

批次處理

大量更新或刪除時，分批執行避免鎖表：
```sql
DELETE FROM logs

WHERE created\_at \< '2023-01-01'

LIMIT 1000;
```
事務保護（Transaction）

防止錯誤操作：

```sql

START TRANSACTION;

DELETE FROM orders WHERE id = 123;

ROLLBACK; -- 若發現錯誤

COMMIT;   -- 確認後提交
```

📌 如果你喜歡這系列，歡迎留言你想學的內容、收藏這篇文章，或追蹤我讓你持續獲得 SQL 系列更新！