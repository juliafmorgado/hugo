---
title: "Converting strings into camelCased strings"
author: "Julia Furst Morgado"
date: 2022-07-04T17:42:38.291Z
lastmod: 2023-01-08T10:34:01-05:00
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/2022-07-04_converting-strings-into-camelcased-strings_0.png
tags: ["JavaScript", "Codewars"]
categories: ["Tech"]

description: ""

subtitle: ""

image: "https://blog-imgs-23.s3.amazonaws.com/2022-07-04_converting-strings-into-camelcased-strings_0.png" 
images:
 - "https://blog-imgs-23.s3.amazonaws.com/2022-07-04_converting-strings-into-camelcased-strings_0.png"


---

While doing my homework, I encountered an exciting exercise. The goal was to write a function that changes words like “add four subtract six” into camel-cased “addFourSubtractSix”.

That is: removes all spaces, and each word besides the first one becomes uppercased.

Below I’ll explain step by step how I solved the problem.

### Start the function

Here we’ll create a function called camelize that accepts a parameter named str of type string.

```
function camelize(str) {//function body}
```

### Return the string with methods applied to it

```
return str
```

We start with a return statement because we already want the result of the function right off the bat.

### Split the string into an array

We call the split() method on the string (str). First, let’s split the string based on the space (‘’) character. Here the space character acts as a splitter or divider.

```
.split(' ')
```

> Be aware that if you don’t add a space between the quotes, it will split the string by each character and return an array containing each character as an element.

### Capitalize the first letter of each word in the array (except for the first one)

To capitalize the first letter of each word in an array:

1. Use the map() method to iterate over each array element.
2. The body of the function arrow has a ternary operator that evaluates if the element is of index zero (first word) or not.
3. If it’s the first word, leave it be.
4. If not, capitalize the first character of the word, word[0], and concatenate the rest of the characters, slice(1).
5. On each iteration, use the toUpperCase() method on the first character of the word and concatenate the rest.
6. The map method will return a new array with all words capitalized (except the first one).

```
.map(    (word, index) => index == 0 ? word: word[0].toUpperCase() + word.slice(1)      )
```

### Convert the array back into a string

The call string.join(“) creates a string with the array elements joined by glue. In this case, the glue is to have no space between the characters.

```
.join('');
```

### Call your function

```
console.log(camelize("background color green blue"))
```

To test our result, we use console.log(). Otherwise, we wouldn’t be able to see if our function is working or not.

To call the function, we call it directly by name, then pass in the parameter value as an argument.

The full answer would be:

```
function camelize(str) {    return str      .split(' ')      .map((word, index) => index == 0 ? word: word[0].toUpperCase() + word.slice(1)      )      .join(''); 

  }

  console.log(camelize("background color green blue"))
```

Finally!

We’ve created a reusable function that capitalizes every word of a string except the first one, converting a string into camelCase in Javascript.

***
If you liked this article, go follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
