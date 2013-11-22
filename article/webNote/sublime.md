##sublime Text 2
#### install package control 

	import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed_packages_path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read())

#### install markdown preview
#### install emmet
#### install theme-soda color theme
[http://buymeasoda.github.io/soda-theme/](http://buymeasoda.github.io/soda-theme/)
* package install----soda  
* preferences.sublime-settiings.users  

    "theme":"Soda Dark.sublime-theme",
    "soda_classic_tabs": true,
    "soda_folder_icons": true,
    "font_face": "Consolas",
    "font_size": 14,
    "translate_tabs_to_spaces": true,
    "highlight_line": true,
    "draw_white_space": "all"

* restart sublime text

#### key bindings  

    [
        { "keys": ["ctrl+1"], "command": "show_panel", "args": {"panel": "console", "toggle": true} }
    ]

#### python3 and gb2312
new build system

    {
        "cmd": ["C:/Python33/python.exe", "-u", "$file"],
        "file_regex": "^[ ]*File \"(...*?)\", line ([0-9]*)",
        "selector": "source.python",
        "encoding": "gb2312"
    }

