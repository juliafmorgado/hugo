---
title: "Filter out the geese (Codewars — 8kyu)"
author: "Julia Furst Morgado"
date: 2022-07-07T17:47:55.192Z
lastmod: 2023-01-08T10:34:03-05:00

tags: ["Tutorial", "Tips"]

image: "https://blog-imgs-23.s3.amazonaws.com/2022-07-07_filter-out-the-geese-codewars8kyu_0.png" 
images:
 - "https://blog-imgs-23.s3.amazonaws.com/2022-07-07_filter-out-the-geese-codewars8kyu_0.png"

---

Here’s a link to the Codewars Kata: [codewars.com/kata/57ee4a67108d3fd9eb0000e7/..](https://www.codewars.com/kata/57ee4a67108d3fd9eb0000e7/javascript)

The goal of this exercise is to get back an array without some specific elements in it (elements that are specified in the geese array).

### Start the function

Here we’ll create a function called gooseFilter that accepts a parameter named birds of type Array.

```
function gooseFilter(birds) {//function body}
```

### Return the string with methods applied to it

```
return str
```

We start with a return statement because we already want the result of the function right off the bat.

### Filter the array

```
.filter()
```

We use the filter method to get a subset of the original array (birds) based on specific criteria. The filter method tests each element of the array, so in our case here, we want to pull out ONLY the items that are not included in the geese array.

COPY

```
.filter(item => !geese.includes(item))
```

### Summary

The final function looks like this:

```
function gooseFilter(birds){let geese =  ["African", "Roman Tufted", "Toulouse", "Pilgrim", "Steinbacher"]return birds.filter(item=> !geese.includes(item))}
```

I hope it helps you!

***
If you liked this article, go follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!