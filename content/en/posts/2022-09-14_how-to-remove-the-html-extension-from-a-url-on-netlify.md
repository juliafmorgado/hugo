---
title: "How To Remove The HTML Extension From a URL on Netlify"
author: "Julia Furst Morgado"
date: 2022-09-14T17:46:35.758Z
lastmod: 2023-01-08T10:34:18-05:00
cover:
    image: https://blog-imgs-23.s3.amazonaws.com/2022-09-14_how-to-remove-the-html-extension-from-a-url-on-netlify_0.png
tags: ["Tutorial"]

description: ""

subtitle: ""

image: "https://blog-imgs-23.s3.amazonaws.com/2022-09-14_how-to-remove-the-html-extension-from-a-url-on-netlify_0.png" 
images:
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-14_how-to-remove-the-html-extension-from-a-url-on-netlify_0.png"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-14_how-to-remove-the-html-extension-from-a-url-on-netlify_1.jpg"
 - "https://blog-imgs-23.s3.amazonaws.com/2022-09-14_how-to-remove-the-html-extension-from-a-url-on-netlify_2.jpg"

---

Recently, I was asked how to get rid of the HTML prefix from a URL on a website hosted on Netlify. It’s pretty straightforward, but I thought it would be helpful to walk you through the process.

If you don’t know what I’m talking about here, it’s when you visit a website and the URL looks something like this — [example.com/about.html](https://example.com/about.html). Specifically, the .html part is the problem here as most people would prefer to see [example.com/about](https://example.com/about) instead. It’s nicer, don’t you think?

### How to do it?

Go to Site settings, click Build & deploy and then Post processing.

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-14_how-to-remove-the-html-extension-from-a-url-on-netlify_1.jpg#layoutTextWidth)

Under Asset optimization, click edit settings and enable asset optimization.

![](https://blog-imgs-23.s3.amazonaws.com/2022-09-14_how-to-remove-the-html-extension-from-a-url-on-netlify_2.jpg#layoutTextWidth)

That’s it!

### What is Asset Optimization?

To summarize, “asset optimization” involves minifying (compressing) and merging assets (JavaScript, CSS, images) to improve the time it takes to download and display the content on a webpage.

What gets optimized with Netlify’s asset optimization?

Content file types, such as:

- CSS
- JavaScript
- common image formats
- content referenced from other places on your site this includes links like /path/to/asset.png or ../asset.png or /asset.png it does not include links like [site.netlify.com/path/to/asset.png](https://site.netlify.com/path/to/asset.png) files not referenced directly by any page of the site will not be optimized

Note: If you reference a file/image without a preceding forward slash (/), this can cause the image not to be optimized. Why? This happens when the file is not in the same path as the page itself, so the file isn’t located where the asset optimization expects it to be. If we cannot find the file where it is expected, it won’t be processed.

Something else to keep in mind is that all content processed by the asset optimization system will always be served from a separate CDN (Content Delivery Network). Assets on that CDN currently always have a URL beginning with [d33wubrfki0l68.cloudfront.net](https://d33wubrfki0l68.cloudfront.net/). Also, please note that even if an asset is unchanged (meaning not minified) for some reason, if the asset optimization processed it, it will be served from this CDN.

You can learn more about these settings in their [netlify.toml reference docs](https://docs.netlify.com/configure-builds/file-based-configuration/#post-processing).

* * *
If you liked this article, go follow me on [Twitter](https://twitter.com/juliafmorgado) (where I share my tech journey) daily, connect with me on on [LinkedIn](https://www.linkedin.com/in/juliafmorgado/), check out my [IG](https://www.instagram.com/juliafmorgado/), and make sure to subscribe to my [Youtube](https://www.youtube.com/c/JuliaFMorgado) channel for more amazing content!!
