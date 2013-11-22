## Python Packages Manager

#### 如何查找Python提供的包
PyPi----python packages index

#### 如何install Modules，卸载Modules等
source安装：  

    python setup.py install  

命令curl安装：  

    $ curl -O http://python-distribute.org/distribute_setup.py
    $ python distribute_setup.py

卸载：手动卸载  

#### 使用包管理工具pip
安装pip：  
1.安装requirement  
pip requires either setuptools or distribute. If you are using Python 3.X you must use distribute; setuptools doesn’t support Python 3.X.

    $ curl -O http://python-distribute.org/distribute_setup.py
    $ python distribute_setup.py

2.安装pip  

    $ curl -O https://raw.github.com/pypa/pip/master/contrib/get-pip.py
    $ [sudo] python get-pip.py

使用pip：  
path环境变量：C:\Python33\Scripts\
1.搜索包  

    $ pip search 'douban'
    douban-client             - Python client library for Douban APIs (OAuth 2.0)
    douban-python             - Python client library for Douban APIs

2.安装包  

    $ pip install douban-client
    Downloading/unpacking douban-client
      Downloading douban-client-0.0.5.tar.gz
      Running setup.py egg_info for package douban-client

    Downloading/unpacking py-oauth2>=0.0.5 (from douban-client)
      Downloading py-oauth2-0.0.6.tar.gz
      Running setup.py egg_info for package py-oauth2
      ......

3.Show what files were installed:  

    $ pip show --files douban-client
    ---
    Name: douban-client
    Version: 0.0.5
    Location: c:\python33\lib\site-packages
    Requires: py-oauth2
    Files:
      ..\douban_client\client.py
      ..\douban_client\scope.py
      ..\douban_client\__init__.py
      ..\tests\framework.py

4.列出过期包  

    $ pip list --outdated

5.包升级  

    $ pip install --upgrade douban-client

6.卸载包  

    $ pip uninstall douban-client

#### 发布自己的包