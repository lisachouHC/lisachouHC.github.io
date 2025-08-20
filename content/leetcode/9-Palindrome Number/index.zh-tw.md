---
title: 9.Palindrome Number
cover_image: true
tags:
  - leetCode
---

Given an integer x, return true if x is a palindrome, and false otherwise.

Example 1:

> Input: x = 121

> Output: true

> Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:

> Input: x = -121

> Output: false

> Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:

> Input: x = 10

> Output: false

> Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

* Constraints:

-231 \<= x \<= 231 - 1

Follow up: Could you solve it without converting the integer to a string?

palindrome代表回文。
條件中以不轉為String的方式解題，我們將以這方向前進。
以不轉成String的方式，那就將數字轉一個圈，比對是否相符
```java
class Solution {
    public boolean isPalindrome(int x) {
        if(x < 0){
          return false;
        }
        int reverse=0;
        int xcopy=x;

        while(x >0){
          reverse=(reverse*10)+(x%10);
          x/=10;
        }
        return reverse == xcopy;        
    }
}

```

Python版
```python
class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
            return False

        reverse = 0
        xcopy = x

        while x > 0:
            reverse = (reverse * 10) + (x % 10)
            x //= 10
        
        return reverse == xcopy
```