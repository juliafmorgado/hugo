---
title: "The difference between encodeURI() and encodeURIComponent()"
author: "Julia Furst Morgado"
date: 2022-09-28T23:59:13.879Z
lastmod: 2023-01-08T10:34:20-05:00
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/2022-09-28_difference-between-encodeuri-and-encodeuricomponent_0.png
tags: ["Tips"]


image: "https://blog-imgs-23.s3.amazonaws.com/2022-09-28_difference-between-encodeuri-and-encodeuricomponent_0.png" 
images:
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-28_difference-between-encodeuri-and-encodeuricomponent_0.png"

---

### What is a URI and how is it different from a URL?

**URI** stands for Uniform Resource Identifier.
**URL** stands for Uniform Resource Locator.

Anything that uniquely identifies a resource is its URI, such as id, name, or ISBN number. A URL specifies a resource and how it can be accessed (the protocol). All URLs are URIs, but not all URIs are URLs.

### Why do we need URL encoding:

Certain characters have a special value in a URL string. For example, the ? character denotes the beginning of a query string. To successfully locate a resource on the web, it is necessary to distinguish when a character is meant as a part of a string or part of the URL structure.

This means we need to encode these characters when passing them into a URL; otherwise, they may cause unpredictable situations.

### Characters encoded

The difference between **encodeURI()** and **encodeURIComponent()** are exactly 11 characters.

**encodeURI()** will not encode: ~!@#$&*()=:/,;?+’

**encodeURIComponent()** will not encode: ~!*()’

### When to encode:

JS offers some functions which we can use to easily encode URL’s. These are two convenient options:

- **encodeURI()**: should be used to encode a URI or a full URL.

```
encodeURI("http://www.example.org/a file with spaces.html")//http://www.example.org/a%20file%20with%20spaces.html
```

- **encodeURIComponent()**: should be used to encode a URI Component such as individual values in the query string

```
`http://domain.com/?search=\${encodeURIComponent('encode & decode param')}`

// 'http://domain.com/?search=encode%20%26%20decode%20param'
```

or when you want to encode the value of a URL parameter.

```
var p1 = encodeURIComponent("http://example.org/?a=12&b=55")
```

Then you may create the URL you need:

```
var url = "http://example.net/?param1=" + p1 + "&param2=99";
```

And you will get this complete URL:

[http://example.net/?param1=http%3A%2F%2Fexample.org%2F%Ffa%3D12%26b%3D55&param2=99](http://example.net/?param1=http%3A%2F%2Fexample.org%2F%Ffa%3D12%26b%3D55&param2=99)

### Conclusion

If you have a complete URL, use encodeURI. But if you have a part of a URL, use encodeURIComponent.

* * *
If you liked this article, go follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!

