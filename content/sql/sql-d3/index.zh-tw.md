---
title: SQL 關鍵約束一次搞懂：PRIMARY KEY、FOREIGN KEY、NOT NULL、UNIQUE 完整解析
cover_image: true
tags:
  - SQL
  - 新手
  - 教學
series:
  - SQL初學
seriesorder: 9
---

前幾篇再講解如何insert或update，那接下來要講的就是建立資料表時最重要的KEY了。

在資料庫設計中，除了欄位名稱與資料型態之外，「約束條件（Constraints）」是保證資料正確性與一致性的關鍵。

今天我們要深入解析四個最常見的 SQL 約束：

1. PRIMARY KEY
2. FOREIGN KEY
3. NOT NULL
4. UNIQUE

這篇文章不只是定義，還會有範例與最佳實務，幫助你在真實專案中正確使用它們。

## 1. PRIMARY KEY — 主鍵

功能

唯一識別一筆資料

不能為 NULL

一個資料表只能有 一組 PRIMARY KEY（但可以由多個欄位組成複合主鍵）

範例

```sql

CREATE TABLE Users (

    user\_id INT PRIMARY KEY,

    username VARCHAR(50)

);
```
> 要點

適合用在唯一辨識資料的欄位，例如 user\_id、order\_id。

常搭配 AUTO\_INCREMENT（MySQL）或 SERIAL（PostgreSQL）自動生成。

## 2. FOREIGN KEY — 外鍵

功能

建立資料表之間的關聯

保證欄位的值必須存在於另一張表的主鍵中

用來維護「參考完整性」

範例

```sql

CREATE TABLE Orders (

    order\_id INT PRIMARY KEY,

    user\_id INT,

    FOREIGN KEY (user\_id) REFERENCES Users(user\_id)

);
```
> 要點

外鍵值必須已存在於參照的主鍵表中。

可搭配 ON DELETE CASCADE、ON UPDATE CASCADE 控制刪改行為。

## 3. NOT NULL — 非空約束

功能

限制欄位必須有值

避免資料遺漏

範例

```sql

CREATE TABLE Products (

    product\_id INT PRIMARY KEY,

    product\_name VARCHAR(100) NOT NULL

);
```
> 要點

適合對關鍵欄位加上限制，例如名稱、價格等必填欄位。

如果欄位可能沒有值，不要亂加 NOT NULL，以免未來資料無法插入。

## 4. UNIQUE — 唯一約束

功能

限制欄位值不能重複

與 PRIMARY KEY 不同，可以有多個 UNIQUE 欄位

範例

```sql

CREATE TABLE Employees (

    emp\_id INT PRIMARY KEY,

    email VARCHAR(100) UNIQUE

);
```
> 要點

適合限制帳號、信箱等必須唯一的欄位。

可搭配多欄位 複合唯一約束

sql

ALTER TABLE Employees

ADD CONSTRAINT unique\_name\_department UNIQUE (name, department\_id);

## 小結

| 約束          | 功能     | 可否 NULL | 可否重複 | 一表可有多個? |
| ----------- | ------ | ------- | ---- | ------- |
| PRIMARY KEY | 唯一識別資料 | 否       | 否    | 否       |
| FOREIGN KEY | 建立關聯   | 是       | 可重複  | 可       |
| NOT NULL    | 禁止空值   | 否       | 可重複  | 可       |
| UNIQUE      | 限制唯一值  | 是       | 否    | 可       |


### 最佳實務建議

**主鍵**必須簡潔，建議用數字或短字串，避免用長文字當主鍵。

**外鍵**加上索引，提高查詢效率。

**NOT NULL** 用在必填欄位，避免造成插入失敗。

**UNIQUE** 結合商業邏輯，不要只因為「好像會重複」就加上。
