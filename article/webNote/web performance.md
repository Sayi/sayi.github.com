# High Web Performance —— Make the Web Faster

## PageSpeed Insights
> https://developers.google.com/speed/

The PageSpeed family of tools is designed to help you optimize the performance of your website. PageSpeed Insights  will help you identify performance best practices that can be applied to your site and provide suggestions to make them faster.

#### PageSpeed Insights Rules规则
* Avoid landing page redirects 避免重定向
* Enable compression 启用压缩
* Improve server response time 改善响应时间
* Leverage browser caching 
* Minify Resources
* Optimize images
* Optimize CSS Delivery
* Prioritize visible content
* Remove render-blocking JavaScripts
* Use Asynchronous Scripts

###### Avoid landing page redirects 避免重定向
> you have more than one redirect from the given url to the final landing page.  

重定向会触发额外的HTTP请求相应周期和增加额外的往返时间延迟，所以最小化重定向的数目将是非常重要的，然而有些时候必须用重定向，此时需鼓励慎重考虑网页的设计去改善性能。

###### Enable compression 启用压缩
> compressible resources on the page were not served with HTTP compression.  

许多Web服务器要么是通过内建方式要么通过第三方模块都提供了压缩格式GZip的支持，这个可以减少大量时间去渲染页面。有流行的服务器上都可以启用压缩。
** 注意：Proxy servers and anti-virus software can disable compression when files are downloaded to a client machine. 所以有时候服务器启用了压缩，PageSpeed并不能识别 **


###### Improve server response time 改善响应时间
> your server response time is above 200 ms.  

服务器响应时间量度了从服务器到加载基本HTML去渲染页面的减少网络延迟的时间。有许多原因会导致响应时间变慢：缓慢的程序逻辑、缓慢的数据库查询、缓慢的路由、CPU或者内存的原因等。首先第一步就是要发现是什么原因导致响应时间这么高，然后通过测量后的数据通过合适的指导解决这个问题，一旦这个问题解决了，你仍然必须继续测量服务器响应时间和解决今后任何的性能瓶颈。

###### Leverage browser caching 衡量浏览器缓存
>  the response from your server doesn’t include explicit caching headers or if the resources have a short freshness lifetime.  

缓存一些静态资源可以节省用户下次访问页面的时间。缓存Headers可以应用在所有可缓存的静态资源上。你应该为你的页面考虑合适的缓存策略。  
设置Expires至少一周，最大一年，如果你确切知道资源何时被改变，一个短的过期时间也是可以的。如果这个资源可能随机会被改变，你可以设置一个唱的过期时间，然后使用URL fingerprinting技术来实现更新。  
** Expires and Cache-Control: max-age headers **
** Last-Modifed and ETag headers **
** Using URL fingerprinting ：We can accomplish this by giving each version of the resource a unique URL.
A common way of fingerprinting is with a 128-bit hexadecimal number that encodes the hash of the contents of the file.  **

###### Minify Resources 压缩资源(HTML、JS、CSS)
> the size of one of your resources could be reduced through minification.  

压缩资源涉及到消除无用的字节，如多余的空格，换行，缩进。压缩HTML、CSS和JavaScript能够加速下载、解析和执行。CSS压缩工具有YUI Compressor、cssmin.js，JS压缩工具有Closure compiler、JSMin、YUI Compressor等。

###### Optimize images 优化图片
 > the images on the page can be optimized to reduce their size without significantly impacting their visual quality.  

合理的选择图标的格式，如：  
* PNGs总是优先于Gifs，尽管有点古老的浏览器并不支持PNGs  
* 对于非常小、非常简单或使用动画的图像使用Gifs，比如小于10*10像素或者颜色不超过三种  
* 对于摄影风格的图片使用JPGs  
* 不要使用BMPs或者TIFFs  
压缩图片：  
一些工具可以压缩JPEG和PNG文件，且不影响图片质量。如工具：jpegtran、jpegoptim、OptiPNG、PNGOUT。  

###### Optimize CSS Delivery 优化CSS传输
> a page includes render blocking external stylesheets, which delay painting of content to the screen.  

浏览器渲染页面依赖于外部CSS的加载，如果外联样式非常小，可以使用内联样式，如果是个大小很大的CSS外联样式，为了不至于导致页面above-the-fold内容过多，那么需要识别并且有需要的在页面上面内联一些样式，然后延缓外联样式文件的加载。，如在页面上面内联一些必须的属性，最下部延缓加载：  

    <noscript><link rel="stylesheet" href="small.css"></noscript>
** 不要使用内联的CSS属性，这样经常会导致样式重复，而且有可能会导致阻塞。 **

###### Prioritize visible content 优先视觉呈现,减少above-the-fold内容的大小
>  additional network round trips are required to render the above the fold content of the page.  

首先减少above-the-fold内容的资源数量和大小，进行资源压缩、使用CSS代替图片等，然后结构化HTML代码，使其最先呈现紧急的above-the-fold的内容，比如延迟CSS传输，如果在加载主页面内容时加载了第三方的组件，可以改变加载顺序，如果是一篇具有导航和内容的文章，可以先在家内容，再加载导航。

###### Remove render-blocking JavaScripts
> your HTML references a blocking external JavaScript file in the above-the-fold portion of your page.  

如果遇到阻塞的Js，网页就会暂停渲染，等待下载Js，这导致了延迟。可以内联文件很小的Js，并且延迟加载大文件的Js。

###### Use Asynchronous Scripts 使用异步的脚本
>  you are using the synchronous version of a script instead of its asynchronous version.  


#### Best Practices 最佳实践[Web Performance Best Practices](https://developers.google.com/speed/docs/best-practices/rules_intro)
最佳实践覆盖了页面加载的许多方面，包括解析DNS、简历TCP连接，HTTP请求的传输、资源下载、缓存中获取资源、解析和执行脚本以及页面渲染等。  

* Optimizing caching — keeping your application's data and logic off the network altogether
* Minimizing round-trip times — reducing the number of serial request-response cycles
* Minimizing request overhead — reducing upload size
* Minimizing payload size — reducing the size of responses, downloads, and cached pages
* Optimizing browser rendering — improving the browser's layout of a page
* Optimizing for mobile — tuning a site for the characteristics of mobile networks and mobile devices

###### Optimize caching
* Leverage browser caching  
* Leverage proxy caching

###### Minimizing round-trip times（RTT）
* Minimize DNS lookups
* Minimize redirects
* Avoid bad requests
* Combine external JavaScript
* Combine external CSS
* Combine images using CSS sprites
* Optimize the order of styles and scripts
* Avoid document.write
* Avoid CSS @import
* Prefer asynchronous resources
* Parallelize downloads across hostnames 

###### Minimizing request overhead
* Minimize request size
* Serve static content from a cookieless domain

###### Minimizing payload size
* Enable compression
* Remove unused CSS
* Minify JavaScript
* Minify CSS
* Minify HTML
* Defer loading of JavaScript
* Optimize images
* Serve scaled images
* Serve resources from a consistent URL

###### Optimizing browser rendering
* Use efficient CSS selectors
* Avoid CSS expressions
* Put CSS in the document head
* Specify image dimensions
* Specify a character set

###### Optimizing for mobile
* Defer parsing of JavaScript
* Make landing page redirects cacheable


