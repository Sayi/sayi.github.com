# Nginx
#### 简介
[Nginx](http://nginx.org)是一个HTTP和反向代理服务器，它也可以作为邮件代理服务器。

#### 在Windws下的安装、运行、停止
好吧，还是不要在windows下来使用nginx，但是用来随时学习还是可以的。  

    -c </path/to/config> 为 Nginx 指定一个配置文件，来代替缺省的。

    -t 不运行，而仅仅测试配置文件。nginx 将检查配置文件的语法的正确性，并尝试打开配置文件中所引用到的文件。

    -v 显示 nginx 的版本。

    -V 显示 nginx 的版本，编译器版本和配置参数。 

解压缩的nginx目录下会有nginx.exe文件，双击运行后，会在任务管理器中看到进程，关闭的时候需要在任务管理器中结束任务，这样实在很麻烦。我们可以使用命令行来操作：  

    cd nginx-1.4.4
    start nginx

    C:\nginx-1.4.4>tasklist /fi "imagename eq nginx.exe"
    C:\nginx-1.4.4>tasklist  | findstr 'nginx'

    映像名称                       PID 会话名              会话#       内存使用
    ========================= ======== ================ =========== ============
    nginx.exe                     7024 Console                    1      5,764 K
    nginx.exe                     7436 Console                    1      6,280 K

    C:\nginx-1.4.4>tskill 7024

Nginx也提供了关闭的方式  

    nginx -s stop 快速退出
    nginx -s quit 优雅退出
    nginx -s reload 更换配置，启动新的工作进程，优雅的关闭以往的工作进程
    nginx -s reopen 重新打开日志文件
    
查看nginx的版本使用命令 nginx -v：  

    C:\nginx-1.4.4>nginx -v
    nginx version: nginx/1.4.4

测试指定位置的配置文件是否正常  

    C:\nginx-1.4.4>nginx -t -c conf/nginx.conf
    nginx: [warn] duplicate MIME type "text/html" in C:\nginx-1.4.4/conf/nginx.conf:41
    nginx: the configuration file C:\nginx-1.4.4/conf/nginx.conf syntax is ok
    nginx: configuration file C:\nginx-1.4.4/conf/nginx.conf test is successful




