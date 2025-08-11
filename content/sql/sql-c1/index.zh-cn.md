---
title: 日期格式與時間切分技巧：讓時間分析更精準
tags:
  - 新手
  - SQL 系列一
  - SQL
series:
  - SQL初學
seriesorder: 6
---

⏳ 在資料分析中，時間維度幾乎是必考題。今天我們要學會在 SQL 中處理日期格式，並進行時間切分（例如按年、月、日或時段分析）。

⌚ 認識日期時間型別

大多數資料庫有以下幾種常見的時間型別（名稱依 DBMS 可能略有不同）：

型別	說明

DATE	僅日期（YYYY-MM-DD）

TIME	僅時間（HH:MM:SS）

DATETIME	日期 + 時間

TIMESTAMP	日期時間 + 時區資訊

📌 MySQL 與 PostgreSQL 都支援 DATE、TIME、TIMESTAMP，但函數名稱略有不同。

🔍 常用日期函數

不同資料庫的語法稍有差異，以下以 MySQL / PostgreSQL 為例：

功能	MySQL 範例	PostgreSQL 範例

取得年份	YEAR(order\_date)	EXTRACT(YEAR FROM order\_date)

取得月份	MONTH(order\_date)	EXTRACT(MONTH FROM order\_date)

取得日期	DAY(order\_date)	EXTRACT(DAY FROM order\_date)

取得星期幾	DAYOFWEEK(order\_date)	EXTRACT(DOW FROM order\_date)

取得小時	HOUR(order\_time)	EXTRACT(HOUR FROM order\_time)

日期加減	DATE\_ADD(order\_date, INTERVAL 7 DAY)	order\_date + INTERVAL '7 days'

🗂️ 按年、月、日切分資料

假設有一張 orders 訂單表，欄位包含 order\_id, order\_date, amount。

1️⃣ 按月份統計銷售額

sql

複製

編輯

SELECT 

    YEAR(order\_date) AS year,

    MONTH(order\_date) AS month,

    SUM(amount) AS total\_sales

FROM orders

GROUP BY YEAR(order\_date), MONTH(order\_date)

ORDER BY year, month;

2️⃣ PostgreSQL 範例（用 EXTRACT）：

sql

複製

編輯

SELECT 

    EXTRACT(YEAR FROM order\_date) AS year,

    EXTRACT(MONTH FROM order\_date) AS month,

    SUM(amount) AS total\_sales

FROM orders

GROUP BY year, month

ORDER BY year, month;

🕒 按時段切分資料

有時候我們需要知道「一天中的哪個時段銷售最好」：

sql

複製

編輯

SELECT 

    HOUR(order\_time) AS order\_hour,

    COUNT(\*) AS orders\_count

FROM orders

GROUP BY order\_hour

ORDER BY order\_hour;

你也可以將時段分成「早上、中午、下午、晚上」：

sql

複製

編輯

SELECT 

    CASE 

        WHEN HOUR(order\_time) BETWEEN 6 AND 11 THEN 'Morning'

        WHEN HOUR(order\_time) BETWEEN 12 AND 17 THEN 'Afternoon'

        WHEN HOUR(order\_time) BETWEEN 18 AND 23 THEN 'Evening'

        ELSE 'Night'

    END AS time\_period,

    COUNT(\*) AS orders\_count

FROM orders

GROUP BY time\_period;

🛠 日期格式轉換

如果日期是以文字存的（例如 '2025-08-11'），必須先轉成日期型別才能切分。

MySQL：

sql

複製

編輯

STR\_TO\_DATE(date\_string, '%Y-%m-%d')

PostgreSQL：

sql

複製

編輯

TO\_DATE(date\_string, 'YYYY-MM-DD')

📌 小技巧 & 錯誤排雷

✅ 儘量用日期型別儲存時間，避免日後切分出錯

✅ GROUP BY 時，可以直接用 YEAR()、MONTH() 處理

🚫 不要在 WHERE 裡用 YEAR(date\_col) = 2023 篩選，會讓索引失效

🔧 正確作法：

sql

複製

編輯

WHERE order\_date >= '2023-01-01' 

  AND order\_date \< '2024-01-01'
