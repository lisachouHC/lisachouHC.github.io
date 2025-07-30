---
title: 'SELECT 查詢初探：你要的資料，其實一句話就能叫出來｜SQL 系列支線 '
draft: true
tags:
  - SQL
  - 新手
  - SQL 系列一
series:
  - SQL初學
seriesorder: 3
---

學 SQL 最直接的一步就是：「我想看資料，那要怎麼寫？」

答案只有兩個字：SELECT。

SELECT 是所有 SQL 語法中的核心，你可以把它當成「我要查詢」的意思，語法結構就像是和資料庫對話：

## 📣 「欸，幫我找一下這個表格裡面的這幾個欄位，記得條件是這樣，還有請排序一下。」

這篇文章，就是要讓你熟練這句話該怎麼翻成 SQL。

## 🧪 最基本的 SELECT 語法長這樣

```sql

SELECT 欄位名稱
FROM 資料表名稱;

```

範例：

假設我們有一個 employees 表格，裡面有員工的名字、部門與薪資：

如果你只想查出所有人的名字與部門：

```sql
SELECT name, department
FROM employees;
```

## 🎯 加上條件過濾：WHERE

如果你只想查薪資大於 60000 的員工，就要用 WHERE 條件語法：

```
SELECT name, salary
FROM employees
WHERE salary > 60000;
```

這樣會回傳 Bob 的資料。

🔀 資料排序：ORDER BY

想把資料照薪資從高到低排列？

```sql
SELECT name, salary
FROM employees
ORDER BY salary DESC;
```

加上 DESC（降冪）或 ASC（升冪）就能排序。

🧯 限制資料筆數：LIMIT

有些資料表太大，我們不想一口氣撈太多資料，可以用 LIMIT 只抓幾筆：

```sql

SELECT *
FROM employees
LIMIT 2;

```

這樣只會抓前兩筆資料。

👉 如果你用的是 SQL Server，要改用 TOP 或 FETCH 語法；而在 PostgreSQL、MySQL 都支援 LIMIT。

🧠 組合語法實戰：查出 IT 部門薪資超過 65000 的人，依薪資排序

```sql
SELECT name, department, salary
FROM employees
WHERE department = 'IT' AND salary > 65000
ORDER BY salary DESC;
```

⚠️ 初學者常見錯誤

錯誤訊息	原因說明

Unknown column 'Name'	SQL 是區分欄位名稱大小寫的（視資料庫設定），要檢查欄位拼寫是否正確

SELECT \* FROM 少了 ;	雖然不是所有 DBMS 都強制 ;，但加上它可以避免執行錯誤

沒加 FROM	SELECT 一定要指定資料來源表格，否則會報錯

## 🪜 SELECT 技能升級任務

🎯 初學任務：打開你能操作的資料庫，用 SELECT 查出某張表的前三筆資料、含欄位條件與排序

你可以使用：

SQLite + DB Browser（免安裝資料庫伺服器）

MySQL + Workbench

或線上工具 like SQL Fiddle

## 🧭 小結：SELECT 是資料的入口，千萬別小看它

很多人以為 SELECT 很簡單，但其實這是資料查詢世界的「入口語法」。你學會怎麼精準寫 SELECT，也就踏出了進入資料世界的第一步。

而接下來，你會遇到更強大的工具：WHERE 裡的條件邏輯、模糊查詢、IN、BETWEEN、IS NULL 等等。

## ⏭ 下一篇將進入支線 B2：

🔍 「SQL 條件過濾大全：你會的不只 WHERE，還有 IN、LIKE、BETWEEN 等等進階查詢技巧！」

📌 喜歡這個系列嗎？按下追蹤、收藏或留言告訴我你最想學的部分，我將持續更新這套 SQL 技能樹，一步步幫你升級資料思維！
  