## Apache DS
ApacheDS中™是一种可扩展和嵌入的目录服务器，完全用Java编写的，通过了Open Group的LDAPV3兼容认证,最基本的，它是一个LDAP Server.  

* LDAPv3 Compliant
* Multi-Master Replication（多主复制）：多主复制通过RFC4533（内容同步操作）的支持已被添加到ApacheDS的2.0，它也兼容使用OpenLDAP。
* 密码策略支持：ApacheDS中支持LDAP目录“RFC草案”密码策略，允许它实行一系列旨在鼓励用户采用强密码，并正确地使用它们的规则。
* 基于LDIF的配置：ApacheDS中的配置依赖于LDIF文件，在对ldap技术熟悉的人中是个众所周知的格式，使其更容易配置服务器。
* Written in Java and Embeddable
* 跨平台

### 下载和安装
#### 系统要求
JDK5.0+
#### Windows下安装
The server can be started and stopped with Windows Services manager (Control Panel > Administrative Tools > Services). You must be admin to do this.
From there, you can easily start, stop and restart Apache DS.
作为系统服务，可以很容易的启动停止apacheDS。

### 基本配置
#### 修改LDAP监听端口
默认情况下，LDAP Server监听端口10389(未加密或者startTLS)和10636(SSL).通用的LDAP运行在协议规定的389端口上。  

1. 使用Apache Directory Studio修改端口  
首先保证服务是启动的，并且连接上这个服务，这样在studio中可以通过Connections视图选中连接，右键打开配置即可修改端口，修改后需要重启服务。  
如果服务未启动，可以通过修改文件ApacheDS\instances\default\conf/config.ldif。  

2. Modifying the configuration LDIF partition  
所有的ApacheDS配置存在ou=config分区下。
The configuration is stored as a set of LDAP entries, so you can update one of them. In order to modify the entry containing the ports, you have first to find it, and second to send a valid modify request.  
端口存储在entry：ads-transportid=ldap,ou=transports,ads-serverId=ldapServer,ou=servers,ads-directoryServiceId=default,ou=config

#### 修改admin的密码
admin的DN和密码：

    admin DN：uid=admin,ou=system 
    the current password (default is "secret")

在studio中Connections视图中新建连接，输入ip地址和端口号(10389)，然后输入admin的dn和密码，即可登入成功。  

打开DN: uid=admin,ou=system，双击userPassWord，可以查看当前密码和修改密码为123456，修改好密码后，可以通过Connections视图右键属性校验密码。  



#### ApacheDS v2.0 Basic User's Guide
[http://directory.apache.org/apacheds/basic-user-guide.html](http://directory.apache.org/apacheds/basic-user-guide.html)
