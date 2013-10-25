#### AspectJ pointcut designators切入点指示符：bean

> Spring AOP also supports an additional PCD named 'bean'. This PCD allows you to limit the matching of join points to a particular named Spring bean, or to a set of named Spring beans (when using wildcards). The 'bean' PCD has the following form:

>     bean(idOrNameOfBean)  

> The 'idOrNameOfBean' token can be the name of any Spring bean: limited wildcard support using the
> '*' character is provided, so if you establish some naming conventions for your Spring beans you can
> quite easily write a 'bean' PCD expression to pick them out. As is the case with other pointcut
> designators, the 'bean' PCD can be &&'ed, ||'ed, and ! (negated) too.  

仅仅只有Spring AOP支持bean作为切入点指示符，而不是AspectJ。 这是Spring对AspectJ中定义的标准PCD的一个特定扩展。其中'idOrNameOfBean'标记可以是任何Spring bean的名字，示例如下：  

* 任何一个在名为'tradeService'的Spring bean之上的连接点 （在Spring AOP中只是方法执行）：

    bean（tradeService）

* 任何一个在名字匹配通配符表达式'*Service'的Spring bean之上的连接点 （在Spring AOP中只是方法执行）：

    bean（*Service）

#### 在基于@AspectJ Style时使用bean切入点指示符
> 在基于注解方式的项目中，通常会遇到对于同一个切入方法，有时候需要前后执行不同的代码。那么就需要对同一个方法进行区别-----即“按需切入”：需要切入什么代码，就切入什么代码。  

在基于XML方式配置的bean中很容易做到这点，只需要为这个bean手动配置两个不同的代理即可（org.springframework.aop.framework.ProxyFactoryBean）。而在使用注解方式（<aop:aspectj-autoproxy/>）或者基于xml的自动代理（org.springframework.aop.aspectj.annotation.AnnotationAwareAspectJAutoProxyCreator）的时候，切面都是自动代理，那么如何去按需切入同一个方法呢？

那么想到的办法就是区别调用该方法的bean名称了。如下：

    @Autowired
    @Qualifier("accountServiceImpl")
    private AccountService accountService;
    
    @Autowired
    @Qualifier("accountService2")
    private AccountService accountService2;
accountServiceImpl为@service自动生成的bean，accountService2则仍然 **需要自己手动在xml中配置** 了，这样的切入点表达式就可以写成如下这样：

    @Around("bean(accountService2)")

    @Around("bean(accountServiceImpl)")

#### 总结
按需切入的出发点是对于同一个方法的bean，构造多个不同id的bean，然后通过bean表达式区别这些bean。当然缺点是多个bean仍然需要在xml中配置，不能完全使用注解。另一方面，注解和配置结合使用也是很好的实践。