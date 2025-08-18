---
title: SQL學習第九步 DDL 新手到高手：讓資料表動起來
draft: false
cover_image: true
tags:
  - 新手
  - SQL 系列一
  - SQL
series:
  - SQL初學
seriesorder: 9
---

在前幾篇，我們已經學會了如何建立資料表（CREATE TABLE），但實際開發中，需求往往會變動，這意味著我們需要「改動」已經存在的資料表。

這個過程，就是 DDL（Data Definition Language） 的另一個重點：

* 修改欄位
* 刪除欄位
* 重新命名
* 刪除整張表

今天，我們會一步步示範這些操作，並分享一些在真實專案中的最佳實務。

## 1. 修改欄位（ALTER TABLE ... MODIFY / ALTER COLUMN）

假設我們有一張 users 資料表，欄位 username 原本是 VARCHAR(20)，但後來需求變成可以輸入更長的名稱。

ALTER TABLE users

MODIFY username VARCHAR(50);

注意：在 MySQL 是用 MODIFY，但在 PostgreSQL 則是 ALTER COLUMN ... TYPE。

PostgreSQL 寫法：

ALTER TABLE users

ALTER COLUMN username TYPE VARCHAR(50);

## 2. 新增欄位（ADD COLUMN）

需求變更很常見，比如我們需要在 users 表中加上 email 欄位：

ALTER TABLE users

ADD COLUMN email VARCHAR(100) NOT NULL;

小技巧：盡量一次新增所需欄位，減少多次 ALTER TABLE，因為每次 ALTER 都可能影響表結構與效能。

## 3. 刪除欄位（DROP COLUMN）

如果 nickname 欄位不再需要，可以這樣刪除：

ALTER TABLE users

DROP COLUMN nickname;

⚠ 風險：刪除欄位是不可逆的，資料會永久消失，務必在刪除前做備份。

## 4. 欄位重新命名（RENAME COLUMN）

欄位名稱可能因為業務邏輯而調整，比如將 username 改成 user\_name：

MySQL 8+：

ALTER TABLE users

RENAME COLUMN username TO user\_name;

PostgreSQL：

ALTER TABLE users

RENAME COLUMN username TO user\_name;

## 5. 刪除整張表（DROP TABLE）

如果整張表都不再使用，可以直接刪除：

DROP TABLE users;

慎用：這會直接刪掉表結構與資料，沒有回收桶。

## 6. 真實專案建議

先備份 — 在任何刪除或修改表結構前，先做備份（mysqldump、pg\_dump）。

先在測試環境試跑 — 千萬別直接在正式環境 ALTER。

版本控制資料庫結構 — 可以用 Flyway 或 Liquibase 來做 schema 變更的版本管理。

與後端工程師溝通 — 表結構的改動可能影響 API 或 ORM。

## 7. 小結

本篇我們掌握了：

* 修改欄位型別
* 新增/刪除欄位
* 欄位改名
* 刪除資料表

在下一篇，我們會進入 階段三 C3（索引 Index），學會如何讓查詢更快 🚀。
