---
title: SQL 學習第五步 GROUP BY 分組查詢與 HAVING 條件：你不能只會 SELECT，要開始做報表了！
draft: false
tags:
  - SQL
  - 新手
  - SQL 系列一
series:
  - SQL初學
seriesorder: 5
---

✨ 什麼是 GROUP BY？
當我們想要「對某欄位的資料進行分組統計」，例如計算每個部門的員工數或每個產品的總銷售額，這時候就會用到 GROUP BY。

```sql
SELECT department, COUNT(*) AS total_employees
FROM employees
GROUP BY department;
```

這段語法的意思是：將員工依照部門分組，並計算每個部門的員工數。

## 🎯 GROUP BY 的常見搭配：聚合函數


搭配 GROUP BY 使用的函數有：

| 函數        | 說明   |
| --------- | ---- |
| `COUNT()` | 計算筆數 |
| `SUM()`   | 總和   |
| `AVG()`   | 平均   |
| `MIN()`   | 最小值  |
| `MAX()`   | 最大值  |

例如：計算每個城市的平均薪資

```sql
SELECT city, AVG(salary) AS avg_salary
FROM employees
GROUP BY city;
```

🧠 為什麼需要 HAVING？
WHERE 是在資料進入分組前就過濾，但有時候我們想要「針對分組後的結果」再進行篩選，比如：
----------------------------------------------

「只想看平均薪資超過 60,000 元的城市」

這時就需要使用 HAVING：

```sql
SELECT city, AVG(salary) AS avg_salary
FROM employees
GROUP BY city
HAVING AVG(salary) > 60000;
```

🧩 HAVING 是針對「分組後」的結果再進行過濾。

## 🧪 GROUP BY vs HAVING vs WHERE 差在哪？

| 條件         | 說明           |
| ---------- | ------------ |
| `WHERE`    | 過濾**原始資料**   |
| `GROUP BY` | 分組           |
| `HAVING`   | 過濾**分組後**的資料 |

```sql
SELECT department, COUNT(*) AS total_employees
FROM employees
WHERE status = 'active'      -- 原始資料先過濾
GROUP BY department
HAVING COUNT(*) > 5;         -- 分組後再過濾
```

### 🔧 實戰練習&#xA;假設你有一個銷售資料表 sales，欄位包含：product, region, amount

1️⃣ 找出每個產品在各區的總銷售金額：

```sql
SELECT product, region, SUM(amount) AS total_sales
FROM sales
GROUP BY product, region;
```

2️⃣ 找出銷售總額超過 10,000 的產品與地區組合：

```sql
SELECT product, region, SUM(amount) AS total_sales
FROM sales
GROUP BY product, region
HAVING SUM(amount) > 10000;
```

📌 小技巧 & 錯誤排雷
✅ GROUP BY 後面出現的欄位，SELECT 裡面也應該出現（除非是聚合函數）

🚫 錯誤：SELECT name, COUNT(*) FROM employees GROUP BY department
🔧 修正：SELECT department, COUNT(*) FROM employees GROUP BY department

✅ 可以 GROUP BY 多個欄位，效果類似「巢狀分類」

## 📚 總結

| 語法         | 用途         |
| ---------- | ---------- |
| `GROUP BY` | 把資料依照欄位分類  |
| `HAVING`   | 分組後進一步過濾   |
| `WHERE`    | 分組前先過濾原始資料 |

記住：「WHERE 是先過濾，HAVING 是後過濾。」


📌 如果你喜歡這系列，歡迎留言你想學的內容、收藏這篇文章，或追蹤我讓你持續獲得 SQL 系列更新！