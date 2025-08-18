---
title: 6.Zigzag Conversion
tags:
  - leetcode
---

The string "PAYPALISHIRING" is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

P   A   H   N

A P L S I I G

Y   I   R

And then read line by line: "PAHNAPLSIIGYIR"

Write the code that will take a string and make this conversion given a number of rows:

string convert(string s, int numRows);

 

Example 1:

> Input: s = "PAYPALISHIRING", numRows = 3

> Output: "PAHNAPLSIIGYIR"

Example 2:

Input: s = "PAYPALISHIRING", numRows = 4

Output: "PINALSIGYAHRPI"

> Explanation:

> P     I    N

> A   L S  I G

> Y A   H R

> P     I

Example 3:

> Input: s = "A", numRows = 1

> Output: "A"

 

Constraints:

1 \<= s.length \<= 1000

s consists of English letters (lower-case and upper-case), ',' and '.'.

1 \<= numRows \<= 1000

我們先從分析題目需求開始

他說"PAYPALISHIRING"是以 zigzag pattern方式寫的

zigzag是指寫法是先以上到下再由左下寫到右上的寫法，但實際讀出來會是由左到右再從上到下

算是密碼學中很常見的加密方式。

nums=上到下的長度。
