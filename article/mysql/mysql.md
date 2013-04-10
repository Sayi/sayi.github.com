# MYSQL  
![](mysql.png)
## 概述  
> * MySQL是一种关联数据库管理系统---关联数据库将数据保存在不同的表中，而不是将所有数据放在一个大的仓库内。这样就增加了速度并提高了灵活性。  
> * MySQL软件是一种开放源码软件。  
> * MySQL数据库服务器具有快速、可靠和易于使用的特点。  
> * MySQL服务器工作在客户端/服务器模式下，或嵌入式系统中。  
> * 有大量可用的共享MySQL软件。  

**“MySQL”的正式发音是“My Ess Que Ell”（而不是“my sequel”）,但我们并不介意你的发音方式是“my sequel”或其他当地方式。**

#### MySQL的的主要特性
* 使用C和C++编写
* 能够工作在众多不同的平台上
* 提供了用于C、C++、Eiffel、Java、Perl、PHP、Python、Ruby和Tcl的API
* 采用核心线程的完全多线程 如果有多个CPU，它能方便地使用这些CPU。
* 提供了事务性和非事务性存储引擎。
* 使用了极快的“B树”磁盘表（MyISAM）和索引压缩。
* 添加另一个存储引擎相对简单。
* SQL函数是使用高度优化的类库实现的，运行很快。通常，在完成查询初始化后，不存在存储器分配。
* 采用Purify（商业内存溢出检测器）以及GPL工具[Valgrind](http://developer.kde.org/~sewardj/)测试了MySQL代码。
* 服务器可作为单独程序运行在客户端/服务器联网环境下
* 众多列类型： 带符号/无符号整数，1、2、3、4、8字节长，FLOAT，DOUBLE，CHAR，VARCHAR，TEXT，BLOB，DATE，TIME，DATETIME，TIMESTAMP，YEAR，SET，ENUM，以及OpenGIS空间类型。
* 定长和可变长度记录。
* 可以将不同数据库的表混合在相同的查询中
* 十分灵活和安全的权限和密码系统，允许基于主机的验证。连接到服务器时，所有的密码传输均采用加密形式，从而保证了密码安全。
* 处理大型数据库： 我们使用了MySQL服务器和含5千万条记录的数据库。
* 在任何平台上，客户端可使用TCP/IP协议连接到MySQL服务器。
* 对数种不同字符集的全面支持，包括latin1 (cp1252)、german、big5、ujis等。例如，在表名和列名中允许使用斯堪的纳维亚字符‘å’、‘ä’和‘ö’。从MySQL 4.1开始，提供了Unicode支持。
* MySQL服务器提供了对SQL语句的内部支持，可用于检查、优化和修复表。通过mysqlcheck客户端，可在命令行上使用这类语句。MySQL还包括myisamchk，这是一种很快的命令行实用工具，可用于在MyISAM表上执行这类操作。

#### 安装布局
> bin客户端程序和mysqld服务器
> 
> data日志文件，数据库
> 
> Docs文档
> 
> examples示例程序和脚本
> 
> include包含(头)文件
> 
> lib库
> 
> scripts实用工具脚本
> 
> share错误消息文件  

#### MySQL程序
> mysqld是MySQL服务器
> mysqld_safe、mysql.server和mysqld_multi是服务器启动脚本
> mysql_install_db初始化数据目录和初始数据库
> mysql是一个命令行客户程序，用于交互式或以批处理模式执行SQL语句。
> mysqladmin是用于管理功能的客户程序。
> mysqlcheck执行表维护操作。
> mysqldump和mysqlhotcopy负责数据库备份。
> mysqlimport导入数据文件。
> myisamchk执行表维护操作。
> myisampack产生压缩、只读的表。
> mysqlbinlog是处理二进制日志文件的实用工具。
> perror显示错误代码的含义。


## 连接与断开服务器
	shell> mysql -h host -u user -p
	Enter password: ********  

host和user分别代表MySQL服务器运行的主机名和MySQL账户用户名。  
成功地连接后，可以在mysql>提示下输入QUIT (或\q)随时退出;在Unix中，也可以按control-D键断开服务器。  

	mysql> QUIT
	Bye  
**连接上服务器并布代表选择了任何数据库**  

#### 关于如何查询的基本知识
知道关于如何查询的基本知识，比马上跳至创建表、给他们装载数据并且从他们检索数据更重要。本节描述输入命令的基本原则，使用几个查询，你能尝试了解mysql是如何工作的，**能够以大小写输入关键词,不区分大小写。**

	mysql> SELECT VERSION(), CURRENT_DATE;
	+-----------+--------------+
	| VERSION() | CURRENT_DATE |
	+-----------+--------------+
	| 5.5.30    | 2013-04-10   |
	+-----------+--------------+
	1 row in set (0.01 sec)
	mysql>  
* 一个命令通常由SQL语句组成，随后跟着一个分号。（有一些例外不需要分号。早先提到的QUIT是一个例子。后面我们将看到其它的例子。）
* 当发出一个命令时，mysql将它发送给服务器并显示执行结果，然后显示另一个mysql>显示它准备好接受其它命令。
* mysql用表格(行和列)方式显示查询输出。第一行包含列的标签，随后的行是查询结果。通常，列标签是你取自数据库表的列的名字。如果你正在检索一个表达式而非表列的值(如刚才的例子)，mysql用表达式本身标记列。
* mysql显示返回了多少行，以及查询花了多长时间，它给你提供服务器性能的一个大致概念。因为他们表示时钟时间(不是 CPU 或机器时间)，并且因为他们受到诸如服务器负载和网络延时的影响，因此这些值是不精确的。（为了简洁，在本章其它例子中不再显示“集合中的行”。）  

**将mysql用作一个简单的计算器**

	mysql> SELECT SIN(PI()/4), (4+1)*5;
	+--------------------+---------+
	| SIN(PI()/4)        | (4+1)*5 |
	+--------------------+---------+
	| 0.7071067811865475 |      25 |
	+--------------------+---------+
	1 row in set (0.02 sec)

	mysql>  
**你可以在一行上输入多条语句，只需要以一个分号间隔开各语句**

	mysql> SELECT VERSION(); SELECT NOW();
	+-----------+
	| VERSION() |
	+-----------+
	| 5.5.30    |
	+-----------+
	1 row in set (0.00 sec)

	+---------------------+
	| NOW()               |
	+---------------------+
	| 2013-04-10 14:03:48 |
	+---------------------+
	1 row in set (0.00 sec)

	mysql>  
**不必全在一个行内给出一个命令，较长命令可以输入到多个行中。mysql通过寻找终止分号而不是输入行的结束来决定语句在哪儿结束。（换句话说，mysql接受自由格式的输入：它收集输入行但直到看见分号才执行。）**

	mysql> SELECT
	    -> USER()
	    -> ,
	    -> CURRENT_DATE;
	+---------------+--------------+
	| USER()        | CURRENT_DATE |
	+---------------+--------------+
	| jon@localhost | 2005-10-11   |
	+---------------+--------------+
**取消输入的查询\c**  

	mysql> SELECT
	    -> USER()
	    -> \c
	mysql>

提示符含义

> mysql>准备好接受新命令。
> 
> ->等待多行命令的下一行。
> 
> '>等待下一行，等待以单引号(“'”)开始的字符串的结束。
> 
> ">等待下一行，等待以双引号(“"”)开始的字符串的结束。
> 
> \`>等待下一行，等待以反斜点(‘`’)开始的识别符的结束。
> 
> /\*>等待下一行，等待以/*开始的注释的结束。  

## 创建并使用数据库
#### Show数据库
SHOW语句找出服务器上当前存在什么数据库，可能你的机器上的数据库列表是不同的，但是很可能有mysql和test数据库。mysql是必需的，因为它描述用户访问权限，test数据库经常作为用户试身手的工作区。

	mysql> show databases;
	+--------------------+
	| Database           |
	+--------------------+
	| information_schema |
	| mysql              |
	| performance_schema |
	| test               |
	+--------------------+
	4 rows in set (0.00 sec)

#### 找出当前选择了哪个数据库DATABASE( )函数

	mysql> SELECT DATABASE();
	+------------+
	| DATABASE() |
	+------------+
	| NULL       |
	+------------+
	1 row in set (0.00 sec)  

#### Use数据库
USE，类似QUIT，不需要一个分号。（如果你喜欢，你可以用一个分号终止这样的语句；这无碍）USE语句在使用上也有另外一个特殊的地方：它必须在一个单行上给出

	mysql> use test
	Database changed

#### CREATE创建数据库

	mysql> CREATE DATABASE menagerie;
**创建数据库并不表示选定并使用它，你必须明确地USE操作。你可以根据上面的例子执行一个USE语句来实现。还可以在调用mysql时，通过命令行选择数据库，只需要在提供连接参数之后指定数据库名称。**

	shell> mysql -h host -u user -p menagerie
	Enter password: ********
#### Show表
展示所有的表  

	mysql> SHOW TABLES;
	+---------------------+
	| Tables in menagerie |
	+---------------------+
	| pet                 |
	+---------------------+

#### CREATE创建表
CREATE TABLE语句指定你的数据库表的布局

	mysql> CREATE TABLE pet (name VARCHAR(20), owner VARCHAR(20),
	    -> species VARCHAR(20), sex CHAR(1), birth DATE, death DATE);

#### DESCRIBE表
查看表结构(描述)

	mysql> DESCRIBE pet;
	+---------+-------------+------+-----+---------+-------+
	| Field   | Type        | Null | Key | Default | Extra |
	+---------+-------------+------+-----+---------+-------+
	| name    | varchar(20) | YES  |     | NULL    |       |
	| owner   | varchar(20) | YES  |     | NULL    |       |
	| species | varchar(20) | YES  |     | NULL    |       |
	| sex     | char(1)     | YES  |     | NULL    |       |
	| birth   | date        | YES  |     | NULL    |       |
	| death   | date        | YES  |     | NULL    |       |
	+---------+-------------+------+-----+---------+-------+

#### LOAD DATA 或者 INSERT 插入表数据
因为你是从一个空表开始的，填充它的一个简易方法是创建一个文本文件，每个动物各一行，然后用一个语句将文件的内容装载到表中。
你可以创建一个文本文件“pet.txt”，每行包含一个记录，用定位符(tab)把值分开，并且以CREATE TABLE语句中列出的列次序给出。对于丢失的值(例如未知的性别，或仍然活着的动物的死亡日期)，你可以使用NULL值。为了在你的文本文件中表示这些内容，使用\N（反斜线，字母N）。

> Whistler	Gwen	bird	\N	1997-12-09	\N

请注意如果用Windows中的编辑器（使用\r\n做为行的结束符）创建文件，（在运行OS X的Apple机上，应使用行结束符'\r'。）,如果你愿意，你能明确地在LOAD DATA语句中指出列值的分隔符和行尾标记，但是默认标记是定位符和换行符。这对读入文件“pet.txt”的语句已经足够。应使用：

	mysql> LOAD DATA LOCAL INFILE '/path/pet.txt' INTO TABLE pet
	    -> LINES TERMINATED BY '\r\n';

INSERT这里字符串和日期值均为引号扩起来的字符串。另外，可以直接用INSERT语句插入NULL代表不存在的值

	mysql> INSERT INTO pet
	    -> VALUES ('Puffball','Diane','hamster','f','1999-03-30',NULL);

## MySQL用户账户管理
当用命令行客户端连接MySQL服务器时，你应为想要使用的账户指定用户名和密码：

	shell> mysql --user=monty --password=guess db_name
#### 向MySQL增加新用户账户
可以用两种方式创建MySQL账户：
* 使用GRANT语句
* 直接操作MySQL授权表

1.首先，使用MySQL程序以MySQL root用户来连接服务器,然后设置帐号和授权：

	mysql> GRANT ALL PRIVILEGES ON *.* TO 'monty'@'%'
	    ->     IDENTIFIED BY 'some_pass' WITH GRANT OPTION;

2.除了GRANT，你可以直接用INSERT语句创建相同的账户，然后使用FLUSH PRIVILEGES告诉服务器重载授权表：

	shell> mysql --user=root mysql
	mysql> INSERT INTO user
	    ->     VALUES('localhost','monty',PASSWORD('some_pass'),
	    ->     'Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y');
	mysql> INSERT INTO user
	    ->     VALUES('%','monty',PASSWORD('some_pass'),
	    ->     'Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y','Y');
	mysql> INSERT INTO user SET Host='localhost',User='admin',
	    ->     Reload_priv='Y', Process_priv='Y';
	mysql> INSERT INTO user (Host,User,Password)
	    ->     VALUES('localhost','dummy','');
	mysql> FLUSH PRIVILEGES;
**FLUSH PRIVILEGES的原因是告诉服务器重读授权表。否则，只有重启服务器后更改方会被注意到。使用 GRANT，则不需要使用FLUSH PRIVILEGES。**
#### 从MySQL删除用户账户
应使用DROP USER语句
#### 设置账户密码
可以用mysqladmin命令在命令行指定密码：

	shell> mysqladmin -u user_name -h host_name password "newpwd"
该命令重设密码的账户为user表内匹配User列的user_name和Host列你发起连接的客户端的记录。

为账户赋予密码的另一种方法是执行SET PASSWORD语句：

	mysql> SET PASSWORD FOR 'jeffrey'@'%' = PASSWORD('biscuit');
只有root等可以更新mysql数据库的用户可以更改其它用户的密码。如果你没有以匿名用户连接，省略FOR子句便可以更改自己的密码：

	mysql> SET PASSWORD = PASSWORD('biscuit');
你还可以在全局级别使用GRANT USAGE语句(在*.*)来指定某个账户的密码而不影响账户当前的权限：

	mysql> GRANT USAGE ON *.* TO 'jeffrey'@'%' IDENTIFIED BY 'biscuit';
