---
title: 7.Reverse Integer
cover_image: true
tags:
  - leetcode
---

Given a signed 32-bit integer x, return x with its digits reversed. If reversing x causes the value to go outside the signed 32-bit integer range \[-231, 231 - 1], then return 0.

Assume the environment does not allow you to store 64-bit integers (signed or unsigned).

Example 1:

> Input: x = 123

> Output: 321

Example 2:

> Input: x = -123

> Output: -321

Example 3:

> Input: x = 120

> Output: 21

先從分析題目開始

題目的要求是反轉數字

那是什麼種類的反轉呢？

根據問題描述，希望得到數字從右到左翻轉，且前面的0不計算的整數

那不管如何，如果要拆解這個數字的話，就可以從字長跟字尾開始

想法是：先將數字轉成string獲取字長，使用10的倍數去對數字進行向上加的動作

```java
String cut=Integer.toString(Math.abs(x));
int len=cut.length();
```

將個位數跟數字使用Math.pow(平方)

```java
while(len>0){
  int modNum=x%10;
  ans+=modNum*Math.pow(len,10);
  x/=10;
  len--;
}
```

最後加總起來的數字即為反轉數字

合併如下

```java
class Solution {
    public int reverse(int x) {
        String cut=Integer.toString(Math.abs(x));
        int len=cut.length()-1;
        int ans=0;
        while(len>=0){
            int modNum=x%10;
            ans+=modNum*Math.pow(10,len);
            x/=10;
            len--;
        }
        ans=ans>=Math.pow(2,31)-1||ans<=Math.pow(-2,31)+1?0:ans;
        return ans;
    }
}
```
