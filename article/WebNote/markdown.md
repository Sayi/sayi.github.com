# Markdown
Markdown 是一个提供给web写作者的从文本转化为HTML的工具，允许写作者轻松的写出容易阅读的普通格式的文本，然后转化为结构化的HTML文本。因此，使用Markdown应该包括两个方面：  
1).书写普通文本格式的语法  
2).普通格式到HTML格式的解析器  
Markdown语法设计的目标就是使它尽可能的容易阅读容易写作，以至于在没有转化为html时，它仍然具有可读性，Markdown 的理念是，能让文档更容易读、写和随意改。
> The idea is that a Markdown-formatted document should be  
> publishable as-is, as plain text, without looking like it’s 
> been marked up with tags or formatting instructions. 一份使用 
> Markdown 格式撰写的文件应该可以直接以纯文本发布，并且看起来不会
> 像是由许多标签或是格式指令所构成。  

## Markdown语法
可读性，无论如何都是重要的。Markdown的语法有一些符号组成，这些符号的作用看起来总是自然，并且一目了然。

#### 段落、标题、引用
段落是一行或者多行的被一个多个空行（空行指一行没有任何字符或者只有空格或者Tabs）隔开的文本。换行在行末尾使用两个空格，然后回车即可  
标题：markdown提供两种风格的语法，一种是标识h1和h2时在文本下方使用=或者-，另一种是在文本的前方使用#，符号的个数标识标题的级别。  
引用使用邮箱风格的‘>’来标识。  

    H1 header
    =========
    h2 header
    ---------

    这行仅仅是一个段落，多个像这样的连续的没有被空行隔开的都称为段落。  
    This is just a regular paragraph.  

    ### h3 header
    > This is a blockquote.
    > 
    > This is the second paragraph in the blockquote.
    > > 内部引用  
      > inner blockquote
转化为HTML格式如下：  

    <h1>H1 header</h1>
    <h2>h2 header</h2>
    <p>这行仅仅是一个段落，多个像这样的连续的没有被空行隔开的都称为段落。
        <br/>This is just a regular paragraph.  </p>
    <h3 id="h3-header">h3 header</h3>
    <blockquote>
    <p>This is a blockquote.</p>
    <p>This is the second paragraph in the blockquote.</p>
    <blockquote>
        <p>内部引用<br>
        inner blockquote</p>
        </blockquote>
    </blockquote>

#### 强调
Markdown使用*和_来强调，就像下面这样：  

    Some of these words *are emphasized*.
    Some of these words _are emphasized also_.

    Use two asterisks for **strong emphasis**.
    Or, if you prefer, __use two underscores instead__.
翻译成HTML后，内容如下：  

    <p>Some of these words <em>are emphasized</em>.
    Some of these words <em>are emphasized also</em>.</p>

    <p>Use two asterisks for <strong>strong emphasis</strong>.
    Or, if you prefer, <strong>use two underscores instead</strong>.</p>

#### 列表
无序列表可以使用符号*、+、-：  

    *   Sayi.
    *   Life.
    *   lf.
都会输出：  

    <ul>
    <li>Sayi.</li>
    <li>Life.</li>
    <li>lf.</li>
    </ul>
有序的列表使用阿拉伯数字即可，紧跟着点号，如：  

    1.  Red
    2.  Green
    3.  Blue

#### 超链接
Markdown支持两种风格创建超链接：内联和引用方式。内联方式如下：  

    This is an [sayi link](http://sayi.github.io "go to sayi").
其中"go to sayi"为title，可有可无，HTML格式如下：  

    <a href="http://sayi.github.io" title="go to sayi">sayi link</a>

引用方式允许通过定义好的名称引用链接，如下：  

    [1]: http://google.com/        "Google"

    欢迎使用搜索引擎： [Google][1].  

#### 图片
和链接的方式非常相似：  

    ![alt text](/path/to/img.jpg "Title")
Reference-style:  

    ![alt text][id]

    [id]: /path/to/img.jpg "Title"

将会转化的HTML为：  

    <img src="/path/to/img.jpg" alt="alt text" title="Title" />

#### 代码区块
普通段落中的一小串代码使用符号`来引用

    Java类 `java.lang.Object` 是基类.
如果要获得整块的预格式化的代码，则每行缩进4个空格或者1个Tab，在代码块的上面要保留一个 **空行** 。

#### 分隔线
你可以在一行中用三个以上的星号、减号、底线来建立一个分隔线，行内不能有其他东西。

#### 转义：反斜杠
Markdown 可以利用反斜杠来插入一些在语法中有其它意义的符号。
这段文字将不会被强调 \*literal asterisks\* 

## 解析工具
书写好的文本，可以直接发布，也可以转化成HTML结构，然后再结合CSS样式发布到网页上。Markdown可以使用任何类记事本的工具进行编辑，有些工具自带了解析器，提供即时显示HTML结构的功能。  
比如windows平台下的MarkPad、markdownpad，使用sublime可以使用markdown的插件来完成解析的功能，eclipse也有相应的markdown插件，解析器在各种语言下都已经有实现，包括不限于Java、python、Javascript等。


## 完整示例

    Sayi：我们正青春
    ================

    [website][dl] -- 01 Nov 2013

    [dl]: http://sayi.github.io


    Introduction
    ------------

    她张开双臂，模仿着我的动作。然后轻轻的说:

    > 我也和你一样，一样的帽子，一样的衣服，一样的动作，可是哈克，
    > 你可以和我一样吗，在麦田自由的奔跑，你只能就这样静静的看着。


    ### 说完，她就走了 ###

    她再也没来看过我。或许，对于一个稻草人而言，永远不会有真正的朋友。更没有资格获得自由。唯一拥有的那段美好时光，只不过是一个小姑娘孩童时期的玩笑而已。

    1.  有时候是个梦。

    2.  有时候是个梦境。

    3.  有时候又从头再来。

    许多年过去了。我孤独的望着这片麦田。晚霞映红天边，在麦田的尽头，一位气质不凡，贵妇打扮的女子慢慢向我走来。她渐渐靠近了我，站在我面前，双手微微颤抖着帮我扶正了陈旧的帽子。

    ***

     **她嘴角轻轻扬起，似乎想以此来掩盖什么。一滴晶莹的泪珠滑过她的脸颊，她说，哈克。稻草人依然在朝她微笑。**

        U + I === LOVE
Sayi：我们正青春
================

[website][dl] -- 01 Nov 2013

[dl]: http://sayi.github.io


Introduction
------------

她张开双臂，模仿着我的动作。然后轻轻的说:

> 我也和你一样，一样的帽子，一样的衣服，一样的动作，可是哈克，
> 你可以和我一样吗，在麦田自由的奔跑，你只能就这样静静的看着。


### 说完，她就走了 ###

她再也没来看过我。或许，对于一个稻草人而言，永远不会有真正的朋友。更没有资格获得自由。唯一拥有的那段美好时光，只不过是一个小姑娘孩童时期的玩笑而已。

1.  有时候是个梦。

2.  有时候是个梦境。

3.  有时候又从头再来。

许多年过去了。我孤独的望着这片麦田。晚霞映红天边，在麦田的尽头，一位气质不凡，贵妇打扮的女子慢慢向我走来。她渐渐靠近了我，站在我面前，双手微微颤抖着帮我扶正了陈旧的帽子。

***

 **她嘴角轻轻扬起，似乎想以此来掩盖什么。一滴晶莹的泪珠滑过她的脸颊，她说，哈克。稻草人依然在朝她微笑。**

    U + I === LOVE



