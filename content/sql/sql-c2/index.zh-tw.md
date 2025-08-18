---
title: SQL 學習第七步 時間區間篩選技巧：讓查詢更精準與高效
tags:
  - SQL
  - 新手
  - SQL 系列一
series:
  - SQL初學
seriesorder: 7
---
常見的時間範圍查詢場景
按日期區間篩選
例如查詢 2023/01/01 到 2023/03/31 的訂單資料。

按時間段篩選
例如每天 18:00 - 23:00 的流量。

按相對時間篩選
例如「最近 7 天」、「今年至今 (YTD)」。

## 🔍 基本範圍查詢
假設 orders 表結構如下：

``` sql
order_id   INT
order_date DATETIME
amount     DECIMA
```
### 1️⃣ 固定日期區間

```sql
SELECT *
FROM orders
WHERE order_date >= '2023-01-01'
  AND order_date < '2023-04-01';
```
📌 為什麼不用 <= '2023-03-31'？
因為 DATETIME 可能包含時分秒，如果你只用 <=，會錯過 3/31 當天 23:59:59 之後的資料。
最佳做法是「用 < 下一天的 00:00:00」。

### 2️⃣ 使用 BETWEEN（需小心精確度）

```sql
SELECT *
FROM orders
WHERE order_date BETWEEN '2023-01-01' AND '2023-03-31 23:59:59';
```
📌 BETWEEN 包含頭尾兩端，適合用在已知完整時間範圍的情況。

### ⏳ 按時間段篩選
如果只想查詢「每天的某個時段」：

```sql
SELECT *
FROM orders
WHERE HOUR(order_date) BETWEEN 18 AND 23;
```
📌 效能警告：
HOUR(order_date) 會讓索引失效，最好先建立一個「小時欄位」或用資料庫的生成欄位（Generated Column）。

## 📅 相對時間篩選
### 1️⃣ 最近 7 天（MySQL）

```sql
SELECT *
FROM orders
WHERE order_date >= NOW() - INTERVAL 7 DAY;
```
### 2️⃣ 今年至今（PostgreSQL）

```sql
SELECT *
FROM orders
WHERE order_date >= DATE_TRUNC('year', CURRENT_DATE);
```
### 3️⃣ 上個月資料（MySQL）

```sql
SELECT *
FROM orders
WHERE order_date >= DATE_FORMAT(CURDATE() - INTERVAL 1 MONTH, '%Y-%m-01')
  AND order_date < DATE_FORMAT(CURDATE(), '%Y-%m-01');
```
🛠 效能最佳化技巧
避免在 WHERE 直接對欄位套用函數（如 YEAR(order_date) = 2023），改用範圍比較。

為時間欄位建立索引（INDEX）。

大批量查詢時，可分批處理（Batch Query）。

📌 小結
固定時間範圍 → 用 >= 與 < 搭配。

相對時間 → 善用 NOW()、CURRENT_DATE、DATE_TRUNC。

避免函數在條件中直接作用，保留索引效能。

📌 如果你喜歡這系列，歡迎留言你想學的內容、收藏這篇文章，或追蹤我讓你持續獲得 SQL 系列更新！