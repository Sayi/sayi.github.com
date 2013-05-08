## SeaJs——A Module Loader for the Web
> SeaJs: [http://seajs.org/](http://seajs.org/)  
> 提供简单、极致的模块化开发体验  
> author: 玉伯(lifesinger)  
> OpenSource：[https://github.com/seajs/seajs](https://github.com/seajs/seajs)

#### Ready for SeaJs  
github上下载Sea.js以及所需的插件(plugin-shim.js)，本文示例的目录结构如下所示  

	examples/  
	    | -- javascript/  
	            | -- lib  
	            | -- module  
	            | -- seajs  
	            | -- hello/  
	                    | -- helloword.js  
	                    | -- config.js  
	    | -- style  
	      -- helloworld.html  

#### 从最原始的方式开始 Hello,world  
如果习惯于最原始的JavaScript编写，只需要在js脚本中 document.write("hello,world")，那么使用seajs，我们有必要使用seaJs的习惯来处理。
下面的程序将在页面上输出hello,world，仅此而已。

helloworld.html  

	<!doctype html>
	<html>
	<head>
		<meta charset="UTF-8">
		<title>seaJs-helloworld</title>
	</head>
	<body>
		<script src="javascript/seajs/sea.js" data-main="hello/helloworld"></script>
	</body>
	</html>
引用sea.js文件，data-main指定了页面起始模块。其中data-main的路径使用了seajs目录的相对路径。（当然我们可以配置base路径，在下文会提到）  

helloword.js  

	define(function(require, exports, module) {
	  //do what you want as you've done
	  //...
	  document.write("hello,world");    
	});  
这个文件使用定义模块的语法定义了一个模块。到这里，似乎一切都很简单，我们仍然可以用我们通常编写JS的方式来使用seaJs，只是把我们的代码稍微遵从了一些约定而已，我们的代码处在一个模块的内部。  
下面让我们忘记JavaScript的一切，从模块开始。

#### 模块Define Module and require Module 、use Module
> 在 Sea.js 里，一切皆是模块，所有模块协同构建成模块系统。  
> 简单性：设计必须简单，这既是对实现的要求，也是对接口的要求。实现的简单要比接口的简单更加重要。简单是设计中需要第一重视的因素。

正如Java语言一样，我们将一些数据和操作封装抽象成一个模块，Sea.js 推崇一个模块一个文件，遵循统一的写法：  
> define(function(require, exports, module) {
> 
>  // 模块代码
> 
> });  

define(factory)是一个全局函数，用来定义模块，factory 可以是一个函数，也可以是一个对象或字符串。factory 为对象、字符串时，表示模块的接口 **就是该对象、字符串** 。比如可以如下定义一个 JSON 数据模块：  

	define({ "foo": "bar" });  

参数介绍：
* require:获取依赖的模块，接受 模块标识 作为唯一参数，用来获取其他模块提供的接口。类似于Java中的import
* exports:用来在模块内部对外提供接口,类似于java中public的作用
* module.exports:与 exports 类似，用来在模块内部对外提供接口。  

下面我们来定义一个Math模块，来提供一些数学运算的基础功能。在module目录下新建文件math.js,代码如下：  

	define(function(require, exports, module){
		exports.add = function() {
		  var sum = 0, i = 0, args = arguments, l = args.length;
		  while (i < l) {
		    sum += args[i++];
		  }
		  return sum;
		};
		module.exports = {
		    multi: function() {
		      var sum = 1, i = 0, args = arguments, l = args.length;
			  while (i < l) {
			    sum *= args[i++];
			  }
			  return sum;
		    }    
		};
	});

我们使用了exports和module.exports来对外暴露接口，在这里module.exports不能简单的换成exports。
**区别：exports 仅仅是 module.exports 的一个引用。在模块内部给 exports 重新赋值时，并不会改变 module.exports 的值。因此给 exports 赋值是无效的，不能用来更改模块接口。**  

在我们任何需要使用math这个模块的模块内部，我们引入math模块，然后便可以使用math暴露出来的接口，如下：  

	var math = require('./module/math');
	math.add(23, 1, 8); //32


#### 配置SeaJs Config
已经知道如何定义模块，以及如何使用模块，接下来就看看seaJs带给我们的那些配置。
为了使用seaJs的配置，我们可以在script标签中增加属性data-config="hello/config"来实现(配置可以直接写在 html 页面上，也可以独立出来成为一个文件)。如下：  

	<script src="javascript/seajs/sea.js" data-config="hello/config" data-main="hello/helloworld"></script>

config.js  

	seajs.config({
	  debug: true,
	  // Enable plugins
	  plugins: ['shim'],
	  
	  // Configure alias
	  alias: {
	    'jquery': {
	      src: 'lib/jquery-1.8.0.min.js',
	      exports: 'jQuery'
	    },
	    'math': {
	      src: 'module/math.js'
	    }	    
	  },

	  // Sea.js 的基础路径
	  base: 'http://example.com/path/to/base/',

	});

#### Integrated with Jquery
假如在config中配置了jquery的别名  

	alias: {
		    'jquery': {
		      src: 'lib/jquery-1.8.0.min.js',
		      exports: 'jQuery'
		    }    
		},  
那么在需要使用Jquery的模块内部就可以通过  

	var $ = require('jquery');
来使用jquery了。

#### Integrated with Jquery plugins
对于jquery插件，我们需要在alias中配置依赖，如下：  

	alias: {
		'jquery': {
			src: 'lib/jquery-1.8.0.min.js',
			exports: 'jQuery'
		 }，    
		'jquery.validate': {
			src: 'lib/jquery.validate.js',
			deps: ['jquery']
		 },
		'bootstrap': {
			src: 'lib/bootstrap.min.js',
			deps: ['jquery']
		 }
	}, 
然后在需要使用插件的内部，通过如下代码来引用：  

	  var $ = require('jquery');
	  require('jquery.validate');
	  require('bootstrap');


#### i18n----模板变量  

	seajs.config({
	  vars: {
	    'locale': 'en'
	  }
	 });  
 然后在模块内部就可以根据这个配置动态加载模块  

	var lang = require('./i18n/{locale}.js');  

在模块内部，可以动态改变locale的值，通过  

	seajs.config.vars.locale=××××

#### 调试Debug  
由于缓存的原因，导致修改了js代码在页面不能及时生效，此时可以通过配置plugin-nocache.js插件，或者通过时间戳等方案解决。但是如上操作都会导致浏览器中的JS调试失效，因为每次加载的文件路径不一样。可以通过关闭浏览器的缓存进行调试。如chrome，打开开发者工具，点击右下角的设置图标，然后禁用缓存即可。

#### 构建工具Grunt.js

#### 性能优化