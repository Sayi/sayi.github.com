#Spring LDAP 
spring-ldap-core(the Spring LDAP library)

## JNDI/LDAP和JDBC/DB
JNDI是用来做LDAP的编程，正如JDBC是用来SQL编程一样。尽管他们有着完全不同各有优缺点的API，但是它们还是有一些共性：  

* They require extensive plumbing code, even to perform the simplest of tasks.
* All resources need to be correctly closed, no matter what happens.
* Exception handling is difficult  

Spring JDBC提供了jdbcTemplate等简便的方式来操作数据库，Spring LDAP也提供了类似的方式操作LDAP----ldapTemplate。

## xml 配置(LdapContextSource、ldapTemplate)

<!--?prettify lang=xml?-->
    <bean id="contextSourceTarget" class="org.springframework.ldap.core.support.LdapContextSource">
        <property name="url" value="ldap://localhost:10389" />
        <property name="base" value="dc=example,dc=com" />
        <property name="userDn" value="uid=admin,ou=system" />
        <property name="password" value="secret" />
    </bean>
    <bean id="contextSource"
        class="org.springframework.ldap.transaction.compensating.manager.TransactionAwareContextSourceProxy">
        <constructor-arg ref="contextSourceTarget" />
    </bean>
    <bean id="ldapTemplate" class="org.springframework.ldap.core.LdapTemplate">
        <constructor-arg ref="contextSource" />
    </bean>
如上配置后，就可以在程序中注入ldapTemplate进行操作了。

## 使用DistinguishedName来构建DN，使用过滤器来更多的限制查询条件
DistinguishedName类实现了Name接口，提供了更优秀的方法来操作目录，这个类已经过时了，推荐使用javax.naming.ldap.LdapName这个类。在我们构建任何操作的时候，都可以使用此类构造基目录。  

<!--?prettify lang=java?-->
    private DistinguishedName buildDn() {
            DistinguishedName dn = new DistinguishedName();
            dn.append("ou", "People");
            return dn;
    }
一个更复杂的构建如下，查找某个唯一userid的dn，其中使用了过滤器AndFilter：  

<!--?prettify lang=java?-->
    protected Name getPeopleDn(String userId) {
        AndFilter andFilter = new AndFilter();
        andFilter.and(new EqualsFilter("objectclass", "person"));
        andFilter.and(new EqualsFilter("objectclass", "xUserObjectClass"));
        andFilter.and(new EqualsFilter("uid", userId));
        List<Name> result = ldapTemplate.search(buildDn(), andFilter.encode(),
                SearchControls.SUBTREE_SCOPE, new AbstractContextMapper() {
                    @Override
                    protected Name doMapFromContext(DirContextOperations adapter) {
                        return adapter.getDn();
                    }
                });
        if (null == result || result.size() != 1) {
            throw new UserNotFoundException();
        } else {
            return result.get(0);
        }

    }
除了dn能限制目录条件外，过滤器提供了关于属性的查询限制条件，AndFilter是与的过滤器，EqualsFilter则是相等过滤器，还有很多内置过滤器，如WhitespaceWildcardsFilter、LikeFilter、GreaterThanOrEqualsFilter、LessThanOrEqualsFilter等。

## 稍复杂的AttributesMapper---查询(search、lookup)
查询操作有两个方法，分别是search和lookup，前者在不知道dn的情况下进行搜索，而后者更像是直接取出对应的Entry。如上的search代码就是在某个dn的所有子树(SearchControls.SUBTREE_SCOPE)下搜索符合过滤器条件的DN列表：  

<!--?prettify lang=java?-->
    List<DistinguishedName> result = ldapTemplate.search(buildDn(),
                filter.encode(), SearchControls.SUBTREE_SCOPE,
                new AbstractContextMapper() {
                    @Override
                    protected DistinguishedName doMapFromContext(
                            DirContextOperations adapter) {
                        return (DistinguishedName) adapter.getDn();
                    }
    });

下面的代码将是直接查出所需要的Entry,其中第二个参数表示要取出的属性，可选：  

<!--?prettify lang=java?-->
    public Account queryUser(String userId) {
        return (Account) ldapTemplate.lookup(getPeopleDn(userId), new String[] {
                        "uid", "cn", "objectClass" }, new AccountAttributesMapper());

    }
    private class AccountAttributesMapper implements AttributesMapper {
        public Object mapFromAttributes(Attributes attrs) throws NamingException {
            Account person = new Account();
            person.setUserID((String)attrs.get("uid").get());
            person.setUserName((String)attrs.get("cn").get());
            person.setDescription((String)attrs.get("description").get());
            return person;
        }
    }

AttributesMapper类似与JDBC中的RowMapper,实现这个接口可以实现ldap属性到对象的映射，spring也提供了更为简单的上下文映射AbstractContextMapper来实现映射，这个类在取ldap属性的时候代码更为简单和优雅。

## 更简单的上下文映射AbstractContextMapper---查询
如上节所示，我们已经知道ldap属性到对象的映射，在我们查找对象时，我们可以使映射更为简单，如下：  

<!--?prettify lang=java?-->
    public Account queryUser(String userId) {
        return (Account) ldapTemplate.lookup(getPeopleDn(userId), new String[] {
                        "uid", "cn", "objectClass" }, new AccountContextMapper());

    }
    private class AccountContextMapper extends AbstractContextMapper {

        private String[] ldapAttrId;

        @SuppressWarnings("unchecked")
        public AccountContextMapper() {
            ldapAttrId = buildAttr(userAttrService.getLdapAttrIds(),
                    new String[] { "uid", "cn", "objectClass" });
        }

        @Override
        public Object doMapFromContext(DirContextOperations context) {
            Account account = new Account();
            account.setUserId(context.getStringAttribute("uid"));
            account.setUserName(context.getStringAttribute("cn"));
            Map<String, Object> userAttributes = new HashMap<String, Object>();
            // 取帐号元数据的属性值
            for (String ldapAttr : ldapAttrId) {
                Object value;
                Object[] values = context.getObjectAttributes(ldapAttr);
                if (values == null || values.length == 0)
                    continue;
                value = (values.length == 1) ? values[0] : values;
                if (value instanceof String
                        && StringUtils.isEmpty(value.toString()))
                    continue;

                userAttributes.put(ldapAttr, value);
            }
            account.setUserAttributes(userAttributes);

            return account;
        }
    }
在上面的代码中，我们完全可以只关注doMapFromContext这个方法，通过参数context让获取属性更为方便，其中的变量ldapAttrId只是一些额外的用途，标识取哪些属性映射到对象中，完全可以忽略这段代码。


## 增加(binding)
插入数据无非我们要构造这个数据的存储目录，和数据属性，通过上面的知识我们可以很轻松的构造DN，构造数据我们采用DirContextAdapter这个类，代码如下：

<!--?prettify lang=java?-->
    DirContextAdapter context = new DirContextAdapter(dn);
    context.setAttributeValues("objectclass",
            userLdapObjectClasses.split(","));
    context.setAttributeValue("uid", account.getUserId());
    mapToContext(account, context);
    ldapTemplate.bind(context);
ldapTemplate.bind(context)是绑定的核心api。  
ldap的属性值也是有类型的，比如可以是字符串，则通过setAttributeValue来设置属性值，可以是数组，则通过setAttributeValues来设置属性值。其中mapToContext属于自定义的方法，用来映射更多的对象属性到LDAP属性，如下自定义的代码：  

<!--?prettify lang=java?-->
    protected void mapToContext(Account account, DirContextOperations ctx) {
        ctx.setAttributeValue("cn", account.getUserName());
        ctx.setAttributeValue("sn", account.getUserName());
        ctx.setAttributeValue("user-account-time",
                getDateStr(account.getLifeTime(), "yyyy/MM/dd"));

        if (StringUtils.isNotEmpty(account.getPassword())) {
            ctx.setAttributeValue("userPassword", account.getPassword());
        }

        Map<String, Object> userAttributes = account.getUserAttributes();
        for (Map.Entry<String, Object> o : userAttributes.entrySet()) {
            String ldapAtt = userAttrService.getLdapAttrId(o.getKey());
            if (ldapAtt == null)
                throw new RuntimeException("Invalid attribute " + o.getKey());
            if (o.getValue() == null)
                continue;
            if (o.getValue() instanceof String
                    && StringUtils.isWhitespace(o.getValue().toString())) {
                continue;
            }
            if (ObjectUtils.isArray(o.getValue())
                    && !(o.getValue() instanceof byte[])) {
                Object[] array = ObjectUtils.toObjectArray(o.getValue());
                if (array != null && array.length != 0)
                    ctx.setAttributeValues(ldapAtt, array);
            } else if (o.getValue() instanceof List) {
                Object[] array = ((List) o.getValue()).toArray();
                if (array != null && array.length != 0)
                    ctx.setAttributeValues(ldapAtt, array);
            } else
                ctx.setAttributeValue(ldapAtt, o.getValue());
        }
    }

## 删除(unbinding)
解绑非常的简单，直接解绑目录即可，如下：  

<!--?prettify lang=java?-->
    ldapTemplate.unbind(dn);

## 修改(modifying)
修改即是取得对应Entry，然后修改属性，通过modifyAttributes方法来修改  

<!--?prettify lang=java?-->
        DirContextOperations context = ldapTemplate
                .lookupContext(dn);
        context.setAttributeValue("user-status", status);
        ldapTemplate.modifyAttributes(context);

## rename(重命名或者移动Entry)
Spring 支持移动Entry，通过rename方法，与其同时带来了一个概念：移动策略或者重命名策略。Spring内置了两个策略，分别是DefaultTempEntryRenamingStrategy和DifferentSubtreeTempEntryRenamingStrategy，前者策略是在条目的最后增加后缀用来生成副本，对于DNcn=john doe, ou=users, 这个策略将生成临时DN cn=john doe_temp, ou=users.后缀可以通过属性tempSuffix来配置，默认是"_temp",  
后者策略则是在一个单独的dn下存放临时dn，单独的dn可以通过属性subtreeNode来配置。
策略配置在ContextSourceTransactionManager的事务管理Bean中，属性名为renamingStrategy。
如：  

<!--?prettify lang=xml?-->
    <bean id="ldapRenameStrategy" class="org.springframework.ldap.transaction.compensating.support.DifferentSubtreeTempEntryRenamingStrategy" >
        <constructor-arg name="subtreeNode" value="ou=People,dc=temp,dc=com,dc=cn"></constructor-arg> 
    </bean>
上面这么多，需要在ds服务器支持移动的条件下，否则只能通过删除--插入来代替移动，如下是个移动的示例：  

<!--?prettify lang=java?-->
    DirContextAdapter newContext = new DirContextAdapter(newDn);
    DirContextOperations oldContext = ldapTemplate.lookupContext(oldDn);
    NamingEnumeration<? extends Attribute> attrs = oldContext
                .getAttributes().getAll();
        try {
            while (attrs.hasMore()) {
                Attribute attr = attrs.next();
                newContext.getAttributes().put(attr);
            }
        } catch (NamingException e) {
            throw new RuntimeException("remove entry error:" + e.getMessage());
        }
    ldapTemplate.unbind(oldDn);
    ldapTemplate.bind(newContext);

## 分页支持
很可惜，有些ldap服务器不支持分页，而有些已经支持PagedResultsControl，可以通过cookie来实现与ldap的分页交互。官方文档的示例如下：  

<!--?prettify lang=java?-->
    public PagedResult getAllPersons(PagedResultsCookie cookie) {
        PagedResultsRequestControl control = new PagedResultsRequestControl(PAGE_SIZE, cookie);
        SearchControls searchControls = new SearchControls();
        searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);
        List persons = ldapTemplate.search("", "objectclass=person", searchControls, control);
        return new PagedResult(persons, control.getCookie());
    }

## JDBC 和 LDAP 的事务管理
事务在项目中是必须考虑的一部分，这节讨论两种事务的分别处理和结合，通过注解来完成。
典型的JDBC事务配置如下：  

<!--?prettify lang=xml?-->
    <bean id="txManager"
        class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <property name="dataSource" ref="dataSource" />
    </bean>
     <tx:annotation-driven transaction-manager="txManager" />
我们配置了jdbc的默认事务管理为txManager，在服务层我们可以使用注解@Transcational来标注事务。  

在单独需要ldap事务管理时，我们可以配置ldap的事务，起了个别名ldapTx：  

<!--?prettify lang=xml?-->
    <bean id="ldapTxManager"
    class="org.springframework.ldap.transaction.compensating.manager.ContextSourceTransactionManager">
        <property name="contextSource" ref="contextSource" />
        <qualifier value="ldapTx"/>
    </bean>
我们可以使用注解@Transactional("ldapTx")来标注ldap的事务，如果不想每次引用别名，使用@LdapTransactional，则可以创建注解：  

<!--?prettify lang=java?-->
    import java.lang.annotation.ElementType;
    import java.lang.annotation.Retention;
    import java.lang.annotation.RetentionPolicy;
    import java.lang.annotation.Target;

    import org.springframework.transaction.annotation.Transactional;

    @Target({ ElementType.METHOD, ElementType.TYPE })
    @Retention(RetentionPolicy.RUNTIME)
    @Transactional("ldapTx")
    public @interface LdapTransactional {

    }

在ldap和jdbc同时都有操作的服务中，我们可以配置ContextSourceAndDataSourceTransactionManager来实现事务管理：  

<!--?prettify lang=xml?-->
    <bean id="ldapJdbcTxManager"   
            class="org.springframework.ldap.transaction.compensating.manager.ContextSourceAndDataSourceTransactionManager">  
        <property name="contextSource" ref="contextSource"/>  
        <property name="dataSource" ref="dataSource" />  
        <qualifier value="ldapJdbcTx"/>
    </bean>

## Object-Directory Mapping (ODM) 简介
正如数据库操作中的ORM对象关系映射(表到java对象)一样，ldap操作也有ODM对象目录映射。