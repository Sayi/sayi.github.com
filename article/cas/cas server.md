## SSO (single sign on)
Single sign-on (SSO) is mechanism whereby a single action of user authentication and authorization can permit a user to access all computers and systems where he has access permission, without the need to enter multiple passwords.  

###### 单点登录简介
> Single sign-on (SSO) is a property of access control of multiple related, but independent software systems. 
> With this property a user logs in once and gains access to all systems without being prompted to log in 
> again at each of them. Conversely, Single sign-off is the property whereby a single action of signing out 
> terminates access to multiple software systems.  

###### 单点登录实现方案
略

###### List of single sign-on implementations
* CAS / Central Authentication Service：Protocol and SSO server/client implementation  
* OpenAM：Access management, entitlements and federation server platform，continue to develop and support OpenSSO from Sun now that Oracle has chosen to discontinue development on the project
* Facebook connect：Facebook SSO to third parties enabled by Facebook  
* HP IceWall SSO：Web and Federated Single Sign-On Solution  
* JBoss SSO：Federated Single Sign-on  

## JASIG CAS‎ 单点登录机制

GitHub Source:[https://github.com/Jasig/cas](https://github.com/Jasig/cas)  
CAS download:[http://www.jasig.org/cas/download](http://www.jasig.org/cas/download)  

###### CAS Protocol (Central Authentication Service协议)

* "Client" refers to the end user and/or the web browser.
* "Server" refers to the Central Authentication Service server.
* "Service" refers to the application the client is trying to access.
* "Back-end service" refers to the application a service is trying to access on behalf of a client. This can also be referred to as the "target service"，such as a database server, that does not have its own HTTP interface but communicates with a web application.

###### Cas server webapp部署
1.tomcat SSL 配置[http://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html](http://tomcat.apache.org/tomcat-7.0-doc/ssl-howto.html)  

    Create a keystore file to store the server's private key and self-signed certificate by executing the following command:  

        %JAVA_HOME%\bin\keytool -genkey -alias tomcat -keyalg RSA

    输入密码和一些信息，这样会在用户根目录下生成.keystore文件  

    server.xml 配置

        <Connector port="8443" protocol="HTTP/1.1" SSLEnabled="true"
            maxThreads="150" scheme="https" secure="true"
            keystoreFile="C:/Users/Sayi/.keystore" keystorePass="123456"
            clientAuth="false" sslProtocol="TLS" />  

2.部署cas-server-webapp-3.5.2.war  
将此war包部署到tomcat下改名为cas.war,启动tomcat，访问

    https://localhost:8443/cas
![](cas-login.png)
成功看到登录页面后，由于缺省机制使用
SimpleTestUsernamePasswordAuthenticationHandler.java来认证，所以帐号名和密码相同且不为空即可登录成功。

###### JASIG CAS‎ 认证机制


###### 设计自己的认证方案
###### JASIG CAS‎ 认证控制台
###### Cas server 源码开发环境
###### 扩展CAS之定制化登录页面
###### 扩展CAS之认证
###### 扩展CAS之









