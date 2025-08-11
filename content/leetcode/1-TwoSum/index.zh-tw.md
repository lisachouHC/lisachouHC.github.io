---
title: Two Sum
draft: false
tags:
  - leetCode
  - Array
---

> 1\. Two Sum

> Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

> You may assume that each input would have exactly one solution, and you may not use the same element twice.

> You can return the answer in any order.

> Example 1:

> Input: nums = \[2,7,11,15], target = 9

> Output: \[0,1]

> Explanation: Because nums\[0] + nums\[1] == 9, we return \[0, 1].

> Example 2:

> Input: nums = \[3,2,4], target = 6

> Output: \[1,2]

> Example 3:

> Input: nums = \[3,3], target = 6

> Output: \[0,1]

這題的概念是他會給你一個包含特定長度的陣列跟他的要求值。

最終要輸出的是是否有任意兩個值相加等同於target

因此會使用兩層for迴圈來進行判斷兩個數值相加是否等同於target

```java
class Solution {
    public int[] twoSum(int[] nums, int target) {
        int [] answer=new int[2];
        int x=nums[0],y=nums[1];
        for(int i=0;i<nums.length-1;i++){
            for(int j=i+1;j<nums.length;j++){
                if(nums[i]+nums[j]>target){
                    continue;
                }
                if(nums[i]+nums[j]==target){
                    answer[0]=i;
                    answer[1]=j;
                    return answer;
                }   
            }
        }
        answer[0]=x;
        answer[1]=y;
        return answer;
        
    }
}
```

```python
class Solution(object):
    def twoSum(self,nums:List[int],target:int)->List[int]:
        """
        :type nums: List[int]
        :type target: int
        :rtype: List[int]
        """
        pair_idx={}
        for i ,num in enumerate(nums):
          if target-num in pair_idx:
            return [i,pair_idx[target-num]]
           pair_idx[num]=i
```
