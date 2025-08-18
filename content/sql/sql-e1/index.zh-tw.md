---
title: "SQL 效能優化 ：用 EXPLAIN / QUERY PLAN 解構你的查詢"
date: 2025-08-18
draft: false
tags: ["SQL", "效能優化", "資料庫", "索引", "查詢分析"]
description: "學會使用 EXPLAIN / QUERY PLAN 來解構 SQL，找出 N+1 查詢與 JOIN 爆炸等效能瓶頸，並透過語法與索引策略來優化。"
---

# SQL 效能優化 D1：用 EXPLAIN / QUERY PLAN 解構你的查詢

在學習 SQL 的過程中，你可能會發現：  
同樣的資料，兩個不同寫法的 SQL 查詢，效能可能差異十倍甚至百倍！  
這就是「查詢計畫」的影響。  

今天我們來聊聊如何透過 **`EXPLAIN` / `QUERY PLAN`** 來檢視查詢效能，並討論常見瓶頸與解法。

---

## 🔍 1. 為什麼要看查詢計畫？

當我們執行 SQL 查詢時，資料庫並不是「照著 SQL 語句的字面順序」執行，而是先進行「最佳化」，產生一個 **查詢計畫 (Execution Plan)**。  
這個計畫會決定：  
- 先掃描哪張表？  
- 使用索引還是全表掃描？  
- JOIN 的方式是 Nested Loop 還是 Hash Join？  

如果 SQL 跑得很慢，問題通常藏在這裡。

---

## 📊 2. 使用 `EXPLAIN` 與 `QUERY PLAN`

以 PostgreSQL 舉例：

```sql
EXPLAIN
SELECT *
FROM orders o
JOIN customers c ON o.customer_id = c.id
WHERE c.region = 'APAC';
```
輸出結果可能像這樣：

```sql
Nested Loop
  -> Seq Scan on customers c  (filter: (region = 'APAC'))
  -> Index Scan using orders_customer_id_idx on orders o (customer_id = c.id)
```
解讀方式：

Seq Scan = 全表掃描（效率差，如果資料量大會拖垮效能）

Index Scan = 使用索引搜尋（通常快很多）

Nested Loop = 每找到一筆客戶資料，就去 orders 裡找對應的訂單（小量資料可行，但大量 JOIN 會變慢）

### 👉 小技巧：
在 PostgreSQL 中可以加上 EXPLAIN ANALYZE，同時得到「實際執行時間」和「估算時間」做比較。

## ⚠️ 3. 常見效能瓶頸
### (1) N+1 問題
發生在 ORM 或迴圈查詢時，例如：

```sql
-- 先查所有客戶
SELECT * FROM customers;

-- 然後對每個客戶再查一次訂單
SELECT * FROM orders WHERE customer_id = ?;
這樣如果有 1000 個客戶，就會多 1000 次 SQL 查詢。
```
👉 解法：使用 JOIN 或 IN 一次查回資料。

### (2) JOIN 爆炸
當多張大表直接 JOIN 時，可能會產生「笛卡兒積」，導致中間結果暴增。

```sql
SELECT *
FROM orders
JOIN customers ON orders.customer_id = customers.id
JOIN payments ON orders.id = payments.order_id;
```
👉 解法：

避免一次 JOIN 太多大表
先用子查詢過濾，再 JOIN
確保 JOIN 條件欄位有索引

## ⚙️ 4. 調整語法與索引策略
### (1) 善用索引
在 WHERE 條件、JOIN 條件、ORDER BY 常用的欄位建立索引
避免在索引欄位上使用 LIKE '%xxx' 或函數運算（會失效）

### (2) 改寫語法
使用 EXISTS 取代 IN
使用 JOIN 取代多次子查詢
用分頁 (LIMIT / OFFSET) 控制結果數量

### (3) 觀察實際數據分布
有時候資料量小時不覺得慢，但在百萬筆資料下才會看到效能瓶頸。
👉 建議在測試環境模擬真實資料量。

## 🎯 總結
用 EXPLAIN / QUERY PLAN 了解查詢計畫，才能知道 SQL 為什麼慢。

小心 N+1 查詢與 JOIN 爆炸，這是最常見的效能陷阱。

善用索引與語法調整，才能真正讓查詢跑得快。