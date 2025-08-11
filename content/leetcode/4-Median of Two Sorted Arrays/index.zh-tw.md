---
title: 4. Median of Two Sorted Arrays
---

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:

Input: nums1 = \[1,3], nums2 = \[2]

Output: 2.00000

Explanation: merged array = \[1,2,3] and median is 2.

Example 2:

Input: nums1 = \[1,2], nums2 = \[3,4]

Output: 2.50000

Explanation: merged array = \[1,2,3,4] and median is (2 + 3) / 2 = 2.5.

這題要得到是兩個陣列中的中間值

為了要得到中間值，將兩個陣列合併

中間的index即是答案

```java
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
      if(nums1.length>nums2.length){
         return  findMedianSortedArrays(nums2,nums1);    
       }
       int len1=nums1.length,len2=nums2.length;
       int left=0,right=len1;
       while(left<=right){
         int part1=(left+right)/2;
         int part2=(left+right+1)/2-part1;
                  
         int maxl1=(part1==0)?Integer.MIN_VALUE : nums1[part1 - 1];
         int minr1=(part1==len1)?Integer.MAX_VALUE : nums1[part1];
         int maxl2=(part2==0)?Integer.MIN_VALUE : nums2[part2 - 1];
         int minr2=(part2==len2)?Integer.MAX_VALUE : nums2[part2];
         if(maxl1<=minr2&&maxl2<=minr1){
           if((len1+len2)%2==0){
             return (Math.max(maxl1,maxl2)+Math.min(minr1,minr2))/2.0
           }else{
             return (double)Math.max(maxl1,maxl2);
           }
         }else if(maxl2>minr2)
           right=part1-1;
          else
            left=part1+1;
       }
       return 0.0;
    }
}
```
