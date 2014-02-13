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

###### JASIG CAS‎ 原理


###### 设计自己的认证方案
CAS初始默认的认证处理机制为SimpleTestUsernamePasswordAuthenticationHandler,显然我们需要自己的认证方案。
通常在大规模的单点登录系统中，用户存储在LDAP服务器中是个非常好的选择，cas提供了ldap的支持插件，同样，对于DB认证的方案，cas提供了jdbc的支持插件。下面的示例以一个Properties文件存储帐号和密码来进行认证，用来说明有关的配置：  

首先，新建认证的处理类：  

    package cn.youthplus.cas.authentication.handler;

    import java.io.FileNotFoundException;
    import java.io.IOException;
    import java.io.InputStream;
    import java.util.Properties;

    import org.jasig.cas.authentication.handler.AuthenticationException;
    import org.jasig.cas.authentication.handler.support.AbstractUsernamePasswordAuthenticationHandler;
    import org.jasig.cas.authentication.principal.UsernamePasswordCredentials;

    public class PropertiesAuthenticationHandler extends
            AbstractUsernamePasswordAuthenticationHandler {

        private Properties properties = new Properties();;

        public PropertiesAuthenticationHandler(String fileName) {
            log.warn(this.getClass().getName()
                    + " is only to be used in a testing environment.  NEVER enable this in a production environment.");

            InputStream fis;
            try {
                fis = getClass().getResourceAsStream(fileName);
                properties.load(fis);

            } catch (FileNotFoundException e) {
                log.error("Properties file cannot be found:" + fileName);
            } catch (IOException e) {
                log.error("Load Properties file failed:" + fileName);
            }

        }

        @Override
        protected boolean authenticateUsernamePasswordInternal(
                UsernamePasswordCredentials credentials)
                throws AuthenticationException {
            final String username = credentials.getUsername();
            final String password = credentials.getPassword();

            if (null != properties.getProperty(username)
                    && properties.getProperty(username).equals(password)) {
                return true;
            }
            return false;
        }

    }

然后，在deployerConfigContext.xml中配置这个认证处理类：

    <!-- <bean 
        class="org.jasig.cas.authentication.handler.support.SimpleTestUsernamePasswordAuthenticationHandler" /> -->
     <bean id="propertiesAuthenticationHandler"
        class="cn.youthplus.cas.authentication.handler.PropertiesAuthenticationHandler" >
        <constructor-arg index="0" value="/authentic.properties" />
    </bean>

最后，在classes目录下新建文件authentic.properties，内容如下：  

    sayi=123456

所以，对于认证，我们可以做的多得多。


###### JASIG CAS‎ 认证控制台

###### JASIG CAS‎ 登录流程flow
在了解整个登录流程中cas做了什么，我们有必要先了解一下spring web flow，当然这也不是必须的。


###### 扩展CAS之定制化页面
cas的默认页面在目录WEB-INF/view/jsp/default/ui下，登录页面为casLoginView.jsp，引入了top.jsp和bottom.jsp,在页面中，区别了PC访问和手机访问的显示方式,当且是手机访问方式且加载到手机的样式css文件将显示： `${not empty requestScope['isMobile'] and not empty mobileCss}` 。  
![](cus-login.jpg)  
登录成功后，设定的方案是进入个人中心页面。

###### 扩展CAS之多帐号选择

###### 扩展CAS之头像

###### 扩展CAS之前端校验

###### 扩展CAS之验证码安全和密码安全

###### 扩展CAS之个人信息主页


###### Cas server 源码开发
调试：  
在cas3.5.2中新增类terminateWebSessionListener，在cas-servlet中配置，这个监听器是使得在web flow结束时使session过期，这就在调试的时候总是会遇到Cannot create a session after the response has been committed的异常。解决办法是1、注释掉这个监听器  

    <!-- <webflow:flow-execution-listeners>
      <webflow:listener ref="terminateWebSessionListener" />
    </webflow:flow-execution-listeners> -->
2.提高死亡时间值（调试中不推荐此做法）  

    <bean id="terminateWebSessionListener" class="org.jasig.cas.web.flow.TerminateWebSessionListener"
      p:serviceManagerUrl="${cas.securityContext.serviceProperties.service}" p:timeToDieInSeconds="5"/>
基础知识
Spring MVC
Spring Web Flow









