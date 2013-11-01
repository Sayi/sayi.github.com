## Apache Ant
Apache Ant是一个java库和命令行工具，最广泛的用来构建java应用程序。Ant提供了一系列的任务去编译、集成、测试、运行java应用程序。Ant是由Java编写的，用户可以自己开发自己的antlibs，目前已经有许多商业的和开源的ant插件。  
> [http://ant.apache.org/](http://ant.apache.org/)  

Ant构建脚本是由一系列Target组成的，其中Target可以依赖其它的Target。每个Target是由若干Task组成。总体结构可以写成这样：

    <?xml version="1.0" encoding="UTF-8"?>
    <!-- ====================================================================== 
        注释                                                             
         ====================================================================== -->
    <project name="project" default="init" basedir=".">

        <property name="dir" value="temp" />

        <target name="init">
            <mkdir dir="${dir}" />
        </target>

        <target name="clean" depends="init">
            <delete dir="${dir}" />
        </target>

    </project>
#### Project
每一个构建脚本必须含有一个project元素。  
\<project>是有三个属性，name标识这个构建项目的名称，default属性标识默认执行的Target，basedir属性标识目录的相对根路径。  
\<property>标签来声明变量，如上声明了变量名为dir，值为temp的变量,引用变量使用${}。  
\<target>标签的depends属性表示依赖的Target，执行此Target时，需要先执行依赖的Target。  
\<mkdir>和<delete>表示的是任务Task,是一小段可执行的代码。  
#### Target
Target是任务的集合，在构建过程中合作以达到目标状态。目标可以依赖于其他目标，Apache Ant会确保执行当前目标前这些目标已执行。  

    <target name="A"/>
    <target name="B" depends="A"/>
    <target name="C" depends="B"/>

#### Tarsk
Task有如下的结构：

    <name attribute1="value1" attribute2="value2" ... />
一些内建的任务：  

    copy 复制
    <copy todir="../dest/dir">
    <fileset dir="src_dir">
      <exclude name="**/*.java"/>
    </fileset>
    </copy>

    <copy todir="../dest/dir">
        <fileset dir="src_dir" excludes="**/*.java"/>
    </copy>

    mkdir
    delete

    echo 回显
    <echo message="Hello, world"/>

    gzip
    <gzip src="test.tar" destfile="test.tar.gz"/>

    zip
     <zip destfile="${dist}/manual.zip">
    <fileset dir="htdocs/manual"/>
    <fileset dir="." includes="ChangeLog.txt"/>
    </zip>

    unzip
    <unzip src="${tomcat_src}/tools-src.zip" dest="${tools.home}"/>

    tar
    <tar destfile="${dist}/manual.tar"
     basedir="htdocs/manual"
     excludes="mydocs/**, **/todo.html"
    />

    jar
    <jar destfile="${dist}/lib/app.jar" basedir="${build}/classes"/>

    javac
    <javac srcdir="${src}:${src2}"
         destdir="${build}"
         includes="mypackage/p1/**,mypackage/p2/**"
         excludes="mypackage/p1/testpackage/**"
         classpath="xyz.jar"
         debug="on"
    />

    war
    telnet
    <telnet userid="bob" password="badpass" server="localhost">
       <read>/home/bob</read>
       <write>ls</write>
       <read string="/home/bob"/>
    </telnet>

#### property
设置变量，为自定义构建过程提供和了很好的方式。内建的变量如下：  

    basedir             the absolute path of the project's basedir (as set
                        with the basedir attribute of <project>).
    ant.file            the absolute path of the buildfile.
    ant.version         the version of Ant
    ant.project.name    the name of the project that is currently executing;
                        it is set in the name attribute of <project>.
    ant.project.default-target
                        the name of the currently executing project's
                        default target;  it is set via the default
                        attribute of <project>.
    ant.project.invoked-targets
                        a comma separated list of the targets that have
                        been specified on the command line (the IDE,
                        an <ant> task ...) when invoking the current
                        project.
    ant.java.version    the JVM version Ant detected; currently it can hold
                        the values "1.7", "1.6", "1.5",
                        "1.4",  "1.3" and "1.2".
    ant.core.lib        the absolute path of the ant.jar file.
    ant.home            home directory of Ant
    ant.library.dir     the directory that has been used to load Ant's
                        jars from.  In most cases this is ANT_HOME/lib.

#### 第三方扩展
1. 将第三方扩展jar包放到ant可以找到的位置，如ant_home或者classpath  
2. 脚本中使用他们  

scp 任务：  
依赖jsch.jar包

<!--?prettify lang=xml?-->
    <property name="address" value="172.16.5.23:/opt/tomcat/webapps/project/WEB-INF/lib/" />
    <property name="user" value="root" />
    <property name="password" value="password" />

    <target name="scp-jar" depends="jar">
            <echo message="将jar上传服务器" />
            <scp todir="${user}:${password}@${address}" trust="true" verbose="true" file="${distlib}">
            </scp>
            <echo message="上传完毕" />
    </target>

ftp 任务：依赖jakarta-oro-2.0.8.jar、commons-net.jar包  

junit 任务：junit.jar  
jython.jar：Python with script task  


####　示例

<!--?prettify lang=xml?-->
    <?xml version="1.0" encoding="UTF-8"?>
    <!-- ======================================================================   
         author   Sayi                                                                
         ====================================================================== -->
    <project name="project-sayi" default="jar" basedir=".">
        <property name="version" value="1.0" />
        <property name="src" value="src" />
        <property name="tempClassdir" value="dist/tempClass" />
        <property name="warname" value="sayi.war" />
        <property name="libname" value="sayi-${version}.jar" />
        <property name="distlib" value="dist/${libname}" />
        <property name="distwar" value="dist/sayi" />
        
        <property name="address" value="172.16.0.1:/opt/tomcat/webapps/project/WEB-INF/lib/" />
        <property name="user" value="sayi" />
        <property name="password" value="password" />

        <property name="compile.debug" value="true" />
        <property name="compile.deprecation" value="false" />
        <property name="compile.optimize" value="false" />



        <target name="init">
            <mkdir dir="${tempClassdir}" />
            <mkdir dir="${distwar}" />
        </target>


        <target name="compile" depends="init">
            <javac srcdir="${src}" destdir="${tempClassdir}" encoding="UTF-8" debug="${compile.debug}" deprecation="${compile.deprecation}" optimize="${compile.optimize}">
                <classpath>
                    <fileset dir="webapps/WEB-INF">
                        <include name="lib/*.jar" />
                    </fileset>
                </classpath>
            </javac>
        </target>


        <target name="jar" depends="compile">
            <jar destfile="${distlib}" basedir="${tempClassdir}">
                <manifest>
                    <attribute name="Class-Path" value="${libname}" />
                </manifest>
            </jar>
        </target>


        <target name="war-pre" depends="jar">
            <copy todir="${distwar}" overwrite="true" encoding="UTF-8">
                <fileset dir="webapps">
                    <exclude name="WEB-INF/classes/**" />
                    <exclude name="**/*src*.js" />
                    <exclude name="**/开发包/**" />
                    <exclude name="**/js/src/**" />
                    <exclude name="**/resources/*.html" />
                    <exclude name="**/resources/*.json" />
                </fileset>
            </copy>
            <copy todir="${distwar}/WEB-INF/classes" overwrite="true">
                <fileset dir="${src}">
                    <include name="*.properties" />
                    <include name="*.xml" />
                </fileset>
            </copy>
            <copy file="${distlib}" todir="${distwar}/WEB-INF/lib" overwrite="true">
            </copy>
        </target>

        <target name="war" depends="war-pre">
            <war destfile="dist/${warname}" compress="true">
                <fileset dir="${distwar}" />
            </war>
        </target>

        <target name="scp-jar" depends="jar">
            <echo message="将jar上传服务器" />
            <scp todir="${user}:${password}@${address}" trust="true" verbose="true" file="${distlib}">
            </scp>
            <echo message="上传完毕" />
        </target>

        <target name="clean">
            <delete dir="${tempClassdir}" />
            <delete dir="${distwar}" />
        </target>

    </project>
