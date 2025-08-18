---
title: 5.Longest Palindromic Substring
tags:
  - leetcode
---

Given a string s, return the longest palindromic substring in **s**.

Example 1:

> Input: s = "babad"\
> Output: "bab"\
> Explanation: "aba" is also a valid answer.\
> \
> Example 2:

Input: s = "cbbd"

Output: "bb"

Constraints:

1 \<= s.length \<= 1000

s consist of only digits and English letters.

先從分析題目開始

題目要找的是最長的palindromic substring 

palindromic是指從前或從後讀起來都相同的意思

因此palindromic substring 代表的是類似「八百八」、「美而美」、「美美而美美」的回文

那因此我們需要頭跟尾巴同時有一樣的字元才行。

如果要找到最長回文，比起漫無目的搜尋頭尾。

可以換成是先設定中心，在從左右尋找是否為相同字元。

```java
private static int expandAroundCenter(String s, int left, int right) {
        int L = left, R = right;
        while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
            L--;
            R++;
        }
        return R - L - 1;
    }
```
可以看到left,right是從中心向外擴散的
因此當L跟R不同時，就代表回文斷掉了
那接著就是要做兩件事
1. 建立每個字元都是中心點
2. 對比出最長長度
3. 注意中心有可能是一個或兩個
```java
    //所以點遍歷一遍
    for (int i = 0; i < s.length(); i++) {
        // 當中心僅一個
        int len1 = expandAroundCenter(s, i, i);
        // 當中心有兩個
        int len2 = expandAroundCenter(s, i, i + 1);
        // 對比出最長長度
        int len = Math.max(len1, len2);
        if (len > end - start) {
            start = i - (len - 1) / 2;
            end = i + len / 2;
        }
```
那接著所有元素組合再一起就看起來像下方。

```java
class Solution {
    public String longestPalindrome(String s) {
        if(s.length()<1||s==null){
            return "";
        }
        int start=0,end=0;
        for (int i = 0; i < s.length(); i++) {
            int len1 = expandAroundCenter(s, i, i);
            int len2 = expandAroundCenter(s, i, i + 1);
            int len = Math.max(len1, len2);
            if (len > end - start) {
                start = i - (len - 1) / 2;
                end = i + len / 2;
          }
      }
      return s.substring(start, end + 1);
    }
    private static int expandAroundCenter(String s, int left, int right) {
        int L = left, R = right;
        while (L >= 0 && R < s.length() && s.charAt(L) == s.charAt(R)) {
            L--;
            R++;
        }
        return R - L - 1;
    }
}
```
python 寫法
``` python

def longest_palindrome(s: str) -> str:
    if s is None or len(s) < 1:
        return ""
    
    start, end = 0, 0
    
    for i in range(len(s)):
        len1 = expand_around_center(s, i, i)       # 單中心
        len2 = expand_around_center(s, i, i + 1)   # 雙中心
        max_len = max(len1, len2)
        
        if max_len > end - start:
            start = i - (max_len - 1) // 2
            end = i + max_len // 2
    
    return s[start:end + 1]


def expand_around_center(s: str, left: int, right: int) -> int:
    L, R = left, right
    while L >= 0 and R < len(s) and s[L] == s[R]:
        L -= 1
        R += 1
    return R - L - 1


```