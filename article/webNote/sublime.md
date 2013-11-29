# Sublime Text 2
每个工程师都应该有一款自己心仪的代码工具，除了便捷之外，同时会带给你一种更加优雅的姿势，Sublime以它的配色和性能深深的吸引着许多人。

说到sublime text，我们本可无需多言，因为它就是像记事本那样简单，但是我们还是说些话，因为它并不普通，其中必须要提的就是它的扩展性，众多的插件使得sublime更为强大,并且内置了强大的Python解释器。通过ctr + ~调出python解释器窗口，也可以通过菜单View--show Console调出，在解释器窗口中我们可以看到内置python的版本：  
 
    >>> import sys;
    >>> sys.version
    '2.6.5 (r265:79096, Mar 19 2010, 18:02:59) [MSC v.1500 64 bit (AMD64)]'


## install package control 
通过下面的python代码可以很轻松的实现包管理器的安装。

	import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())
接下来我们可以安装更多的插件，比如markdown preview， emmet,通过ctr+shift+P调出命令窗口，选择Package Control:Package install。

## install theme-soda color theme
[http://buymeasoda.github.io/soda-theme/](http://buymeasoda.github.io/soda-theme/)  

* package install----soda  
* preferences--settiings-user  

    "theme":"Soda Dark.sublime-theme",  
    "soda_classic_tabs": true,  
    "soda_folder_icons": true,  
    "font_face": "Consolas",  
    "font_size": 14,  
    "translate_tabs_to_spaces": true,  
    "highlight_line": true,  
    "draw_white_space": "all"  

* restart sublime text

## key bindings  

    [
        { "keys": ["ctrl+1"], "command": "show_panel", "args": {"panel": "console", "toggle": true} }
    ]

## python3 and gb2312
tools--build system--new build system

    {
        "cmd": ["C:/Python33/python.exe", "-u", "$file"],
        "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
        "selector": "source.python",
        "encoding": "gb2312"
    }

## Emmet使用
快捷键 sublime text
expand abbreviation 缩写扩展 ctr+E
reflect css value 反射css值 ctr+shift+R
