---
title: "SQL 效能優化 ： 索引種類與設計原則"
date: 2025-08-18
draft: false
tags: ["SQL", "效能優化", "資料庫", "索引", "查詢分析"]
description: "學會使用 EXPLAIN / QUERY PLAN 來解構 SQL，找出 N+1 查詢與 JOIN 爆炸等效能瓶頸，並透過語法與索引策略來優化。"
---
# SQL 索引種類與設計原則

索引（Index）是提升 SQL
查詢效能的關鍵工具，但使用不當也可能導致反效果，例如增加寫入成本或讓查詢計劃錯誤選擇。這篇文章將帶你認識常見的索引種類與設計原則。

------------------------------------------------------------------------

## 為什麼需要索引？

當資料表變大時，每次查詢如果都必須進行「全表掃描」（Full Table
Scan），效率會非常差。索引的存在，就像是書本的目錄，可以幫助資料庫快速定位所需的資料列。

------------------------------------------------------------------------

## 常見的索引種類

### 1. B-Tree Index（平衡樹索引）

-   **用途**：最常見的索引類型。

-   **適用情境**：等值查詢（=）、範圍查詢（BETWEEN、\>、\<）。

-   **舉例**：

    ``` sql
    CREATE INDEX idx_users_email ON users(email);
    SELECT * FROM users WHERE email = 'test@example.com';
    ```

### 2. Hash Index

-   **用途**：透過哈希演算法建立索引。
-   **適用情境**：等值查詢（=）。
-   **限制**：不支援範圍查詢（BETWEEN、\>、\<）。

### 3. Bitmap Index

-   **用途**：針對取值範圍小、重複度高的欄位（例如性別、布林值）。
-   **適用情境**：分析型查詢。
-   **限制**：不適合頻繁更新。

### 4. Full-text Index（全文檢索索引）

-   **用途**：加速文字內容的搜尋。

-   **舉例**：

    ``` sql
    CREATE FULLTEXT INDEX idx_posts_content ON posts(content);
    SELECT * FROM posts WHERE MATCH(content) AGAINST ('database');
    ```

### 5. Composite Index（複合索引）

-   **用途**：同時針對多個欄位建立索引。

-   **設計原則**：遵循「最左前綴原則」。\
    例如 `(last_name, first_name)` 索引可加速：

    ``` sql
    SELECT * FROM users WHERE last_name = 'Wang';
    SELECT * FROM users WHERE last_name = 'Wang' AND first_name = 'Lisa';
    ```

    但無法直接用於：

    ``` sql
    SELECT * FROM users WHERE first_name = 'Lisa';
    ```

------------------------------------------------------------------------

## 索引設計原則

1.  **高選擇性欄位優先**\
    如果一個欄位取值非常分散（如 email），它的索引效益通常比性別（只有
    M/F）高。

2.  **避免過度索引化**\
    索引雖然能提升查詢，但會增加寫入成本（INSERT/UPDATE/DELETE）。

3.  **觀察查詢計劃**\
    使用 `EXPLAIN` 或 `QUERY PLAN` 來檢查資料庫是否實際使用索引。

4.  **搭配業務場景設計**\
    OLTP 系統與 OLAP
    系統的需求不同，前者重視即時寫入，後者重視查詢速度。

------------------------------------------------------------------------

## 總結

-   B-Tree 是最常見的索引。
-   Hash 適合等值查詢，Bitmap 適合低基數欄位。
-   複合索引需要遵循「最左前綴原則」。\
-   設計索引時需平衡查詢效能與寫入成本。

