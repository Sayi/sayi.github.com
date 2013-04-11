# Mysql中的SQL
## SQL(Structrured Query Language)  
用于读写Mysql数据库。SQL是与MYSQL交互所需的最基本的工具。

#### SQL的历史
当Mysql出现时，它为数据库服务器业务带来了新的方法。Monty并没有开发另一个庞大的RDBMS，也没有尝试去提供比数据库巨头们更多的特性。而是为最常用的SQL刚能创建了一个小巧而快速的实现。

#### SQL的设计
SQL是一种"自然"语言，因为它具有简单而明确的命令结构。每个称为“查询”的SQL命令都可以被分割为语言元素。**SQL语句不区分大小写**
> select   | name   |  from people  |  where name like '%e'  
> 动词   | 直接宾语  |   间接宾语    |    形容词短语  

#### 表管理
##### Create table

	create table table_name(
	    column_name1 type [modifiers]
	    [, column_name2 type [modifiers]]
	)

	create table user(
	    user_id bigint unsigned not NULL primary key,
	    user_name char(10) not NULL,
	    last_name varchar(30),
	    office char(2) not NULL default 'NY'
	);

> NOTNULL修饰符表示该列不能包含任何null值，如果试图将null值赋给该列，那么sql 将产生错误，
> 此规则有两个例外  
> 1.如果该列被定义为auto_increment,则null值会导致一个自动产生的值  
> 2.如果该列指定了默认值，则null值会被赋予默认值  

#### DROP table
**始终备份并谨慎的删除表**  

	drop table [if exists] table_name1,table_name2;
if exists在设计用于创建数据库及其所有表的庞大脚本时非常有用。

#### INSERT  
当向数值字段插入数据时，可以原样插入，对于其他字段，必须把值放在单引号中。  
**转义字符（默认为/）允许将单引号和其他转义字符直接量进行转义**  

#### UPDATE

 	update table_name set column1=value1 [where clause]  
**WHERE 子句中的列是要搜索的列，所以一般要围绕经常使用的列的组合来创建索引。**  

#### DELETE

	delete from table_name [where clause]

#### SELECT

	select 1;
	select database();
	select current_date();
	select * from people limit 10;


## Mysql DataType
MySQL supports a number of SQL data types in several categories:  
> numeric types  
> date and time types  
> string (character and byte) types.

#### Numeric Type Overview
* Integer Types (Exact Value) - INTEGER, INT, SMALLINT, TINYINT, MEDIUMINT, BIGINT
* Fixed-Point Types (Exact Value) - DECIMAL, NUMERIC
* Floating-Point Types (Approximate Value) - FLOAT, DOUBLE
* Bit-Value Type - BIT

#### Date and Time Types
* The DATE, DATETIME, and TIMESTAMP Types
* The TIME Type
* The YEAR Type

#### String Types
* The CHAR and VARCHAR Types
* The BINARY and VARBINARY Types
* The BLOB and TEXT Types
* The ENUM Type
* The SET Type

## 索引
索引有助于数据库以一种可进行更迅速查找的方式存储数据，遗憾的是，尽管可以更为快速地进行搜索，但在得到这一好处的同时。却要牺牲磁盘空间和修改速度。索引最有效的使用方法是要为那些要频繁查找的列创建索引。

	create index index_name on table_name(column1,column2...)
Mysql也可以在创建表的同时创建索引

	create table material(
	id int not null,
	name char(50) not null,
	resistance int,
	index index1(id,name),
	unique index index2(name)
	)

上面的例子为表创建了两个索引，第一个索引名为index1，由id和那么两个字段组成。第一个索引只包括name字段，指明那么字段必须是惟一的。**一般，应该将所有惟一索引的字段声明为not null**  

## 序列
最好的一种主键是除了作为主键以外在数据库中没有任何意义。更好的设计原则是使用无意义的数字作为主键。  
#### auto_increment
**在mysql中创建表时，最多可以指定一列作为auto_increment，即最多可用于表中一个整数类型的列。**  
> 该列必须是主键或者惟一索引中仅有的列  

这时在插入行时，若指定该行的相应值为null或0，就可以为该列自动完成插入，并置为当前的最高值加1。  
#### LAST_INSERT_ID()函数
可以通过引用此函数的返回值并自己完成增加来实现序列。  

	update table_name set id = last_insert_id(id+1);