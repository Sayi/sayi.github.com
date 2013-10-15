## CAS client
#### cas server 证书 https配置
[https://wiki.jasig.org/display/CASUM/Demo](https://wiki.jasig.org/display/CASUM/Demo)  

    C:\Java\jdk1.7.0_25\bin>keytool.exe
    密钥和证书管理工具
    命令:
     -certreq            生成证书请求
     -changealias        更改条目的别名
     -delete             删除条目
     -exportcert         导出证书
     -genkeypair         生成密钥对
     -genseckey          生成密钥
     -gencert            根据证书请求生成证书
     -importcert         导入证书或证书链
     -importkeystore     从其他密钥库导入一个或所有条目
     -keypasswd          更改条目的密钥口令
     -list               列出密钥库中的条目
     -printcert          打印证书内容
     -printcertreq       打印证书请求的内容
     -printcrl           打印 CRL 文件的内容
     -storepasswd        更改密钥库的存储口令
    使用 "keytool -command_name -help" 获取 command_name 的用法

生成证书（默认的密钥有效期是3个月，可以根据自己需求修改）：

    1. cd  C:\Java\jdk1.7.0_25\bin  
    2. keytool -genkey -alias casserver -keyalg RSA  
      What is your first and last name?  
      enter the CAS server name as the answer (cas.sayi.com)  
      最后输入y  
    3. keytool -export -alias casserver -file server.crt  
    4. keytool -import -file server.crt -keystore ..\jre\lib\security\cacerts
    如果出现 keytool错误： java.io.IOException: Keystore was tampered with, or password was incorrect 则把%JAVA_HOME%/JRE/LIB/SECURITY的cacerts文件删除就可以了。  

Configure Tomcat server.xml：  

    <!-- Define a SSL HTTP/1.1 Connector on port 8734 -->
    <Connector port="8734" maxHttpHeaderSize="8192"
    maxThreads="150" minSpareThreads="25" maxSpareThreads="75"
    enableLookups="false" disableUploadTimeout="true"
    acceptCount="100" scheme="https" secure="true"
    clientAuth="false" sslProtocol="TLS"
    keystoreFile="C:/Documents and Settings/ukari/.keystore"
    keystorePass="changeit"
    truststoreFile="C:/Program Files/Java/jdk1.5.0_11/jre/lib/security/cacerts" />

启动cas server,并且访问https://cas.sayi.com:8734/cas/login

#### cas client 配置

依赖架包：  
下载cas client的架包  

配置web.xml:  

    <!-- 填写退出的URL -->  
    <context-param>  
    <param-name>casServerLogoutUrl</param-name>  
    <param-value>https://cas.sayi.com:8734/cas/logout</param-value>  
    </context-param>  
    <!--单点退出配置-->  
    <listener>  
    <listener-class>org.jasig.cas.client.session.SingleSignOutHttpSessionListener</listener-class>  
    </listener>   
    <filter>
    <filter-name>CAS Single Sign Out Filter</filter-name>  
    <filter-class>org.jasig.cas.client.session.SingleSignOutFilter</filter-class>  
    </filter>  
    <filter-mapping>  
    <filter-name>CAS Single Sign Out Filter</filter-name>  
    <url-pattern>/*</url-pattern>  
    </filter-mapping>
    
    <filter>
    <filter-name>CAS Authentication Filter</filter-name>
    <filter-class>org.jasig.cas.client.authentication.AuthenticationFilter</filter-class>
    <init-param>
    <param-name>casServerLoginUrl</param-name>
    <!--cas登录地址-->  
    <param-value>https://cas.sayi.com:8734/cas/login</param-value>
    </init-param>
    <init-param>
    <param-name>serverName</param-name>
    <!--应用地址-->  
    <param-value>http://imp.wisedu.com.cn:9090</param-value>
    </init-param>
    <init-param>
    <param-name>renew</param-name>
    <param-value>true</param-value>
    </init-param>
    <init-param>
    <param-name>gateway</param-name>
    <param-value>false</param-value>
    </init-param>
    </filter>
    
    <filter>
    <filter-name>CAS Validation Filter</filter-name>
    <filter-class>org.jasig.cas.client.validation.Cas20ProxyReceivingTicketValidationFilter</filter-class>
    <init-param>
    <param-name>casServerUrlPrefix</param-name>
    <!--cas地址-->  
    <param-value>https://cas.sayi.com:8734/cas/</param-value>
    </init-param>
    <init-param>
    <param-name>serverName</param-name>
    <!--应用地址--> 
    <param-value>http://imp.wisedu.com.cn:9090</param-value>
    </init-param>
    </filter>
    
    <filter>
    <filter-name>CAS HttpServletRequest Wrapper Filter</filter-name>
    <filter-class>org.jasig.cas.client.util.HttpServletRequestWrapperFilter</filter-class>
    </filter>
    
    <filter>
    <filter-name>CAS Assertion Thread Local Filter</filter-name>
    <filter-class>org.jasig.cas.client.util.AssertionThreadLocalFilter</filter-class>
    </filter>
    <filter-mapping>
    <filter-name>CAS Authentication Filter</filter-name>
    <!--需要授权访问的网站目录--> 
    <url-pattern>/admin/*</url-pattern>
    </filter-mapping>
    <filter-mapping>
    <filter-name>CAS Authentication Filter</filter-name>
    <!--需要授权访问的网站目录--> 
    <url-pattern>/account/*</url-pattern>
    </filter-mapping>
    
    <filter-mapping>
    <filter-name>CAS Validation Filter</filter-name>
    <url-pattern>/*</url-pattern>
    </filter-mapping>
    
    <filter-mapping>
    <filter-name>CAS HttpServletRequest Wrapper Filter</filter-name>
    <url-pattern>/*</url-pattern>
    </filter-mapping>
    
    <filter-mapping>
    <filter-name>CAS Assertion Thread Local Filter</filter-name>
    <url-pattern>/*</url-pattern>
    </filter-mapping>

浏览器访问：  
http://imp.wisedu.com.cn:9090/imp/admin  
浏览器重定向到https://cas.sayi.com:8734/cas/login?service=http%3A%2F%2Fimp.wisedu.com.cn%3A9090%2Fimp%2Fadmin&renew=true  
输入帐号名和密码，认证成功返回http://imp.wisedu.com.cn:9090/imp/admin，此时就可以通过

    Assertion assertion1 = (Assertion) session.getAttribute(AbstractCasFilter.CONST_CAS_ASSERTION);
    <%= assertion1.getPrincipal().getName() %>
    <%= assertion1.getValidFromDate() %>
    <%= assertion1.getValidUntilDate() %>
    <% 
    Iterator it1 = assertion1.getAttributes().entrySet().iterator();
    while (it1.hasNext()) {
    Map.Entry entry = (Map.Entry) it1.next();
    out.println("<dt>"+entry.getKey()+"</dt>");
    out.println("<dd>"+entry.getValue()+"</dd>");
    }
    %>

详情获取认证用户信息请参见[官方文档及示例](https://wiki.jasig.org/display/CASC/JA-SIG+Java+Client+Simple+WebApp+Sample)
