## Spring international(locale)
Spring对国际化(本地化)的支持和Spring对Theme的支持非常的相似，本文将对国际化中涉及的几个问题逐一进行解决，并实现页面切换。  
> 1. 制作国际化资源  
> 2. 页面提供切换国际化语言的功能  
> 3. 国际化的配置，包括国际化解析器和国际化资源文件等
> 4. Spring国际化标签

###### 制作国际化资源
Spring对大多数资源的处理，在默认的目标的WEB-INF\classes下(这个目录当然可以配置，也可以放在任何打包后会编译到classes下的目录，如src)，建立资源文件，如messages_en.properties、messages_zh.properties。文件内容是一些key对应相应的国际化文本。  

    sayi.lang.zh=Chinese
    sayi.lang.en=English

    sayi.lang.zh=中文(Chinese)
    sayi.lang.en=英文(English)

###### 页面提供切换国际化语言的功能
页面可以提供并排的几个链接，无需标识当前语言，也可以提供标识当前语言的菜单等。服务器校验名称为lang的参数请求从而确定国际化语言。这个名称的配置见下一节。

###### Spring国际化配置
首先配置国际化资源文件，包括位置和前缀：  

<!--?prettify lang=xml?-->
    <bean id="messageSource"
        class="org.springframework.context.support.ReloadableResourceBundleMessageSource">
        <property name="basenames">
            <list>
                <value>classpath:messages</value>
            </list>
        </property>
        <property name="useCodeAsDefaultMessage" value="true">
        </property>
    </bean>
属性useCodeAsDefaultMessage设置为true表示找不到对应的资源key时使用key的字符串代替国际化内容。接下来配置国际化的解析器，`CookieLocaleResolver` 或者 `SessionLocaleResolver` ,如下配置了国际化语言值存储在sayi_lang为名称的cookie中，如果该值为空，则默认使用 `request.getLocale()`的语言。

<!--?prettify lang=xml?-->
    <bean id="localeResolver"
        class="org.springframework.web.servlet.i18n.CookieLocaleResolver">
        <property name="cookieName" value="sayi_lang"></property>
    </bean>

最后为语言切换配置拦截器，其中paramName属性可以配置参数名称：  

<!--?prettify lang=xml?-->
    <bean id="localeChangeInterceptor"
        class="org.springframework.web.servlet.i18n.LocaleChangeInterceptor">
        <property name="paramName" value="lang" />
    </bean>
    <bean
        class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping">
        <property name="interceptors">
            <ref bean="localeChangeInterceptor" />
        </property>
    </bean>

###### Spring国际化标签
通过如上的配置，已经可以切换语言，找到对应的国际化资源文件了，页面中通过标签 `spring:message` 来完成国际化的显示  

<!--?prettify lang=html?-->
    <%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
    <spring:message code='sayi.lang.zh' />

## 总结
国际化无非就是根据不同的语言选择不同的资源文件进行展示，对于一个产品来说，Javascript的国际化也是需要考虑的，通过不同语言引入不同的js国际化内容或者通过一些js框架(seaJs)来实现js国际化,在另一篇文章中有所介绍。