---
title: 'SQL 條件過濾大全：查資料不只是 WHERE，還有 IN、LIKE、BETWEEN！'
draft: false
tags:
  - SQL
  - 新手
  - SQL 系列一
series:
  - SQL初學
seriesorder: 4
---
當你學會了 SELECT 和基本的 WHERE 條件查詢後，接下來就可以解鎖更強大的查詢語法組合！

這一篇是 SQL 條件篩選語法的實戰大全，我會帶你用清楚的範例，快速掌握以下查詢神器：

IN / NOT IN

LIKE 模糊比對

BETWEEN 區間查詢

IS NULL / IS NOT NULL

邏輯運算子 AND / OR / NOT 的正確用法

## 🧲 用 IN 選擇多個條件值（比 OR 還好用）
假設你要查詢來自「New York、Taipei、Tokyo」三個城市的使用者，你可以用這樣的方式寫：

sql

``` sql
SELECT name, city
FROM users
WHERE city IN ('New York', 'Taipei', 'Tokyo');
```
比起這樣寫會更簡潔：

```sql
-- 傳統寫法（不建議）
WHERE city = 'New York' OR city = 'Taipei' OR city = 'Tokyo';
```
想排除特定值？用 NOT IN：

```sql
WHERE city NOT IN ('Moscow', 'Paris')
```
## 🔍 用 LIKE 進行模糊搜尋
有時候你只知道名字的部分關鍵字，這時候就用 LIKE：

```sql 
-- 查所有名字開頭是 A 的人
SELECT name
FROM users
WHERE name LIKE 'A%';
```
% 和 _ 是什麼意思？
| 符號  | 代表     | 範例             |
| --- | ------ | -------------- |
| `%` | 任意長度字元 | `'A%'`：A 開頭    |
| `_` | 單一字元   | `'A_'`：A 開頭兩字元 |


``` sql
-- 查名字中間有 "li" 的人
WHERE name LIKE '%li%'
```
```sql
-- 查第二個字是 "a" 的人
WHERE name LIKE '_a%'
```
📏 用 BETWEEN 查區間（含起始與結尾）
想查 20 到 30 歲的使用者，這樣寫最簡單：

```sql
SELECT name, age
FROM users
WHERE age BETWEEN 20 AND 30;
```
⚠️ 注意：BETWEEN 是包含頭尾的，也就是等於 >= 20 AND <= 30

如果你要排除邊界，請改用：

``` sql
WHERE age > 20 AND age < 30
```

## 🕳 查出「沒有值」的資料：IS NULL / IS NOT NULL
在資料庫中，NULL 代表「沒有值」，這跟 ''（空字串）或 0 不一樣。

查找地址沒填的人：

```sql
SELECT name
FROM users
WHERE address IS NULL;
```
查找地址有填的人：

```sql
WHERE address IS NOT NULL;
```
❌ 錯誤範例（不能用 = 比較 NULL）：

sql

-- 錯誤寫法
WHERE address = NULL
🔗 邏輯運算符的正確使用：AND / OR / NOT
你可以組合條件語句：

sql

-- 查年齡 25 以上，來自 New York 的人
WHERE age >= 25 AND city = 'New York'
使用 OR 時，記得用括號避免誤解：

```sql

-- 查來自 London 或 Tokyo，且年齡大於 30 的人
WHERE (city = 'London' OR city = 'Tokyo') AND age > 30
使用 NOT 排除條件：
```
``` sql

-- 查不是 Sales 部門的人
WHERE NOT department = 'Sales'
## 🧠 實戰練習題
嘗試使用 IN、BETWEEN、LIKE 組合查詢：
```
```sql

-- 查找名字中有 "a"，來自 New York 或 Taipei，且年齡 20～35 歲的使用者
SELECT name, city, age
FROM users
WHERE name LIKE '%a%'
  AND city IN ('New York', 'Taipei')
  AND age BETWEEN 20 AND 35;
```
⚠️ 常見陷阱與注意事項
問題	原因	解法
LIKE 查不到資料	有沒有注意大小寫？不同資料庫預設不同	可用 ILIKE（PostgreSQL）或轉小寫後比對
BETWEEN 包不包含兩端？	包含兩端	BETWEEN 10 AND 20 等於 >=10 AND <=20
IN vs = 性能差別？	IN 用於多值篩選更穩定	少數條件差異不大，多條件請用 IN

## 🧭 小結：熟練這些條件語法，你的查詢將無人能擋
IN：多值選擇更簡潔

LIKE：模糊查詢神器

BETWEEN：區間篩選少不了

IS NULL：找出資料缺漏

AND / OR：記得用括號組合條件

⏭ 下一篇將進入支線 B3：
📊 「GROUP BY 分組查詢與 HAVING 條件：你不能只會 SELECT，要開始做報表了！」

📌 如果你喜歡這系列，歡迎留言你想學的內容、收藏這篇文章，或追蹤我讓你持續獲得 SQL 系列更新！