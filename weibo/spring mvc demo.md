# 基于Annotation的Spring web MVC/ DAO的Demo
> Action，Now！  
> ----sayi

实现功能：login请求----验证---返回响应;  
框架：Spring3.1.3 tomcat7.0.35

1. 由于位于任何web框架集成，采用servlet配置支持spring
  <welcome-file-list>
    	<welcome-file>redirect.jsp</welcome-file>
  	</welcome-file-list>
  
  	<servlet>
  		<servlet-name>weibo</servlet-name>
  		<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
  		<load-on-startup>1</load-on-startup>
  	</servlet>
  
  	<servlet-mapping>
  		<servlet-name>weibo</servlet-name>
  		<url-pattern>/</url-pattern>
  	</servlet-mapping>
* 其中的拦截URL为/,若有需要，以后相应再配置
* 默认访问页面：redirect.jsp 实现跳转至login的请求  
  `<% response.sendRedirect("login"); %>`

2. spring的配置
  <!-- don't forget the DataSource -->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource"
  		destroy-method="close">
  		<property name="driverClass" value="com.ibm.db2.jcc.DB2Driver" />
  		<property name="jdbcUrl" value="jdbc:db2://localhost:50000/db2" />
  		<property name="user" value="db2admin" />
  		<property name="password" value="123456" />
  	</bean>
  
  	<!-- similarly, don't forget the PlatformTransactionManager -->
  	<bean id="txManager"
  		class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
  		<property name="dataSource" ref="dataSource" />
  	</bean>
  	
  	<tx:annotation-driven transaction-manager="txManager" />
  
  
  	<bean
  		class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerMapping" />
  	<bean
  		class="org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter" />
  
  	<context:component-scan base-package="org.weibo" />
  
  
  	<bean id="viewResolver"
  		class="org.springframework.web.servlet.view.InternalResourceViewResolver">
  		<property name="viewClass"
  			value="org.springframework.web.servlet.view.JstlView" />
  		<property name="prefix" value="/WEB-INF/weibo/" />
  		<property name="suffix" value=".jsp" />
  	</bean>
* 配置数据源、并支持@transaction注解驱动
* 配置支持注解并且自动扫描Controller\Service\Respostiy组件
* 配置View层的解析

3. Controller层  
  @Controller
  public class UserController {
  
  	@Autowired
  	private UserService userService;
  
  	@RequestMapping("/login")
  	public String login(@ModelAttribute("user") User user, Model model) {
  		if (userService.checkUser(user.getName(), user.getPwd())) {
  			return "success";
  		} else {
  			model.addAttribute("errorMsg",
  					"Please input the correct name and pwd!");
  			return "login";
  		}
  	}
  }
* Controller声明此为控制器
* @Autowired自动注入
* RequestMapping配置映射的URL
* @ModelAttribute声明model中的名为user的属性
* model为前台页面和Controller之间数据传递的封装类

4.Service层  
  @Service
  public class UserServiceImpl implements UserService{
    
  	@Autowired
  	private UserDAO userDAO;
  
  	@Transactional
  	@Override
  	public boolean checkUser(String name, String pwd) {
  		if (StringUtils.isBlank(name) || StringUtils.isBlank(pwd))
  		{
  			return false;
  		}
  		User user = userDAO.getUser(name);
  		return pwd.equals(user.getPwd());
  	}
  
  }
* transaction声明声明事务处理
* @Service声明服务层

5.DAO  
  @Repository
  public class UserDAOImpl implements UserDAO{
    
  	//protected final Log logger = LogFactory.getLog(getClass());
  	
  	private JdbcTemplate jdbcTemplate;
  	
  	@Autowired
  	public void init(DataSource dataSource) {
  		this.jdbcTemplate =new JdbcTemplate(dataSource);
  	}
  
  	@Override
  	public User getUser(String name) {
  		User user = new User();
  		try {
  			user = jdbcTemplate.queryForObject("SELECT * FROM USER WHERE USERNAME = ?", new RowMapper<User>() {
  
  				@Override
  				public User mapRow(ResultSet rs, int arg1) throws SQLException {
  					User user = new User();
  					user.setName(rs.getString(2));
  					user.setPwd(rs.getString(3));
  					return user;
  				}
  
  				
  			},name);
  		} catch (DataAccessException e) {}
  		return user;
  	}
  
  }
* Resposity声明DAO
* 注入jdbcTemplete

6.login页面:  
<code> <form action="login" method="post">
      <span style="color:red;">${errorMsg}</span>
    	<div>
    		<input type="text" name="name" placeholder="UserName/Email" value="${user.name}"/>
    	</div>
    	<div>
    		<input type="text" name="pwd" placeholder="PassWord" value="${param.pwd}"/>
    	</div>
    	<div>
    		<input type="submit" value="Login" /> <a href="javascript:;">forget
    			password?</a>
    	</div>
  </form></code>
* 注意其中的name和pwd需要和实体User中的变量名相同
