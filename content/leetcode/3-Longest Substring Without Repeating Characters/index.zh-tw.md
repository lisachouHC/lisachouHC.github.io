---
title: 3. Longest Substring Without Repeating Characters
cover_image: false
tags:
  - leetcode
---

Given a string s, find the length of the longest substring without duplicate characters.

Example 1:

Input: s = "abcabcbb"

Output: 3

Explanation: The answer is "abc", with the length of 3.

Example 2:

Input: s = "bbbbb"

Output: 1

Explanation: The answer is "b", with the length of 1.

Example 3:

Input: s = "pwwkew"

Output: 3

Explanation: The answer is "wke", with the length of 3.

Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:

0 \<= s.length \<= 5 \* 104

s consists of English letters, digits, symbols and spaces.

這題的需求是要找到沒有重複，duplicate代表重複，的最長連續字串。

在條件裡有寫說，該字串只有英文單字，而英文單字總共26個

那我們可以建立一個陣列檢查該英文單字是否已經出現過。

```java
boolean [] visited=new boolean[26];
```

建立兩個指針，先都放在開頭，設置一個max當作最長長度

使用while迴圈只動其中一個。

```java
int s=0,e=0;
while(e<s.length)
```

當指針e往下一個走時，如果visited沒有看過，那就continue

否則就要讓s指針前進，直到visited清除看過的痕跡

在清除之前先計算當前長度是否比較長

```java
if(visited[s.charAt(e)-'a'])
  e++;
  continue;
else
  max=Math.max(max,e-a);
  while(visited[s.charAt(e)-'a']){
    visited[s.charAt(s)-'a']=false;
    s++;
}
```

那最後在送出答案前在檢查一次答案

```java
return Math.max(max,e-a);
```

合其來就是

```java
int [] visited=new int[26];
int s=0,e=0;
while(e<s.length){
  if(visited[s.charAt(e)-'a'])
    continue;
  else
    max=Math.max(max,e-a);
    while(visited[s.charAt(e)-'a']){
      visited[s.charAt(s)-'a']=false;
      s++;
  }
  
}
return Math.max(max,e-a);
```
