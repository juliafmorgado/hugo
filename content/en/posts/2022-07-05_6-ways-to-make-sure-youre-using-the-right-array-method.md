---
title: "6 Ways to Make Sure You’re Using the Right Array Method"
author: "Julia Furst Morgado"
date: 2022-07-05T17:46:02.826Z
lastmod: 2023-01-08T10:34:02-05:00
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/2022-07-05_6-ways-to-make-sure-youre-using-the-right-array-method_0.png
tags: ["Tutorial"]

image: "https://blog-imgs-23.s3.amazonaws.com/2022-07-05_6-ways-to-make-sure-youre-using-the-right-array-method_0.png" 
images:
 - "https://blog-imgs-23.s3.amazonaws.com/2022-07-05_6-ways-to-make-sure-youre-using-the-right-array-method_0.png"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-07-05_6-ways-to-make-sure-youre-using-the-right-array-method_1.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-07-05_6-ways-to-make-sure-youre-using-the-right-array-method_2.jpg"


---

Understanding arrays is an important part of coding with JavaScript but array methods are what make JavaScript arrays so powerful.

Array methods are functions built into JavaScript that we can apply to our arrays. Each method performs a change or calculation to our array, saving us from having to write the same function over and over again. Furthermore, using these methods makes coding JavaScript much easier and easier to understand.

I’ve created an array method cheatsheet (it doesn’t contain ALL the methods but most of them) and below I’ll explain some of the most important (in my opinion) used array methods in JavaScript.

![](https://blog-imgs-23.s3.amazonaws.com/2022-07-05_6-ways-to-make-sure-youre-using-the-right-array-method_1.jpg#layoutTextWidth)

### JavaScript Array Methods

### 1. forEach()

The forEach() method executes a provided function once for each array element.

```
const array = [1, 2, 3, 4, 5]array.forEach((item) => console.log(item))

---------Output---------12345
```

Here, inside the forEach loop callback function, each element of the array is automatically passed as the first parameter of the function.

One important thing you need to keep in mind is that the forEach method does not return any value.

### Advantages of using the forEach() method

- Using a forEach loop makes your code shorter and easier to understand
- When using a forEach loop, we don’t need to keep track of how many elements are available in the array. So it avoids the creation of an extra counter variable.
- Using a forEach loop makes code easy to debug because there are no extra variables for looping through the array
- The forEach loop automatically stops when all the elements of the array are finished iterating.

### 2. map()

The map() method creates a new array populated with the results of the callback function for each element in the array. Similar to the other methods, the callback function will receive 3 arguments, currentValue, index, and array.

Always be careful when using map(), remember that each call will create a new array, if you don’t actually need the array and you are simply trying to iterate, use forEach() or for-of instead.

```
const numbers = [1, 2, 3, 4, 5]const doubled = numbers.map(value => value * 2)

console.log(doubled)

---------Output---------> (5) [2, 4, 6, 8, 10]
```

### Advantages of using the map() method

- It helps quickly generate a new array without changing the original array
- It allows us to quickly extract any element of the array
- It generates an array with the exact same length as the original array

### 3. findIndex()

The findIndex() method returns the index of the first element in the array that satisfies the provided callback function. Otherwise, it returns -1, indicating that no element passed the test. Unlike other methods, findIndex() will execute the callback function even for indexes with unassigned values.

```
function isPrime(num) {  for (let i = 2; num > i; i++) {    if (num % i == 0) {      return false    }  }  return num > 1}

console.log([4, 6, 8, 9, 12].findIndex(isPrime))console.log([4, 6, 7, 9, 12].findIndex(isPrime))

---------Output----------12
```

### Advantages of using the findIndex() method

- It allows us to quickly find the index of an element without writing a lot of code
- It stops looping as soon as it finds a match so there is no need for an extra break statement

### 4. find()

The find() method is similar to the findIndex() method, however, it returns the value of the first element which satisfies the provided callback function as supposed to its index. If no element satisfies the callback then undefined is returned.

```
const inventory = [  {name: 'apples', quantity: 2},  {name: 'bananas', quantity: 0},  {name: 'cherries', quantity: 5}]

const result = inventory.find( ({ name }) => name === 'cherries' )

console.log(result)

---------Output---------> {name: "cherries", quantity: 5}
```

### Advantages of using the find() method

- It allows us to quickly find any element without writing a lot of code
- It stops looping as soon as it finds a match so there is no need for an extra break statement

### 5. filter()

Together with map() I think it’s one of my favorites. The filter() method creates a new array with all the elements that pass the test implemented by the callback function.

```
const array = [-3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

function isPrime(num) {  for (let i = 2; num > i; i++) {    if (num % i == 0) {      return false    }  }  return num > 1}

console.log(array.filter(isPrime))

---------Output---------> (6) [2, 3, 5, 7, 11, 13]
```

### Advantages of using the filter() method

- It allows us to quickly find all the matching elements from the array
- It always returns an array even if there is no match, so it avoids writing extra if conditions
- It avoids the need of creating an extra variable to store the filtered elements

### 6. reduce()

The reduce() method executes a callback function once for each assigned value present in the array, taking 4 arguments: accumulator currentValue currentIndex array

The first time the callback is called, the accumulator and currentValue can be either the initialValue if provided, or the first value in the array if not.

```
let arr = [0, 1, 2, 3, 4]

arr.reduce((accumulator, currentValue, currentIndex, array) => accumulator + currentValue)
```

If we go step by step and put in a table all the parameters plus the resulting value of the callback, we would get the following:

![](https://blog-imgs-23.s3.amazonaws.com/2022-07-05_6-ways-to-make-sure-youre-using-the-right-array-method_2.jpg#layoutTextWidth)

And the final result would be 10.

### Advantages of using the reduce() method

- It has several uses like summing all the values of an array or in an object array, counting for particular items in the array, grouping objects, merging arrays contained in an array of objects, removing duplicates, etc.
- Using reduce allows us to generate any type of simple or complex data based on the array
- It remembers the previously returns data from the loop so helps us avoid creating a global variable to store the previous value

***
If you liked this article, go follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
