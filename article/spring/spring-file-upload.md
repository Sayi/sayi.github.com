## Spring 文件上传(multipart form)支持
文件上传在许多系统中都会涉及到，首先我们要明白文件上传到服务器和普通表单内容提交到服务器的区别，然后理解服务器如何处理文件上传的request请求，最后可以解析上传的文件，比如文件名称、文件大小等。本文简要的一步步来完成一个简单的demo。

###### 文件上传的表单form
在html的form标签中，有个enctype属性，规定在发送到服务器之前应该如何对表单数据进行编码。默认的值为 `application/x-www-form-urlencoded`,表示在发送前对所有字符进行编码。然而对于具有文件上传控件的表单，我们需要使用属性值 `multipart/form-data`  

<!--?prettify lang=html?-->
    <form method="post" action="/upload" enctype='multipart/form-data'>
        <input  type="file" name="sayiFile" />
        <button  type="submit">确 认 上 传</button>
    </form>


通过浏览器的开发者工具，可以看到提交表单时的请求体：  

    ------WebKitFormBoundarySTanp4irBqKRx839
    Content-Disposition: form-data; name="file"; filename="sayi.jpg"
    Content-Type: image/jpeg

    ------WebKitFormBoundarySTanp4irBqKRx839--

###### Spring 处理上传请求
在代码中我们可以自己解析上传表单的请求，Spring也提供了内建的实现方式，通过MultipartResolver实现对上传请求的装饰，这个解析器对每个请求进行multipart的检查，如果在请求中包含multipart，解析器将会把HttpServletRequest包装成MultipartHttpServletRequest。内建的类为 `StandardServletMultipartResolver` 和 `CommonsMultipartResolver` ,前者基于servlet3.0，后者需要额外的jar包 **commons-fileupload-1.2.1.jar** 及其依赖包。在applicationContext.xml配置解析器如下：  

<!--?prettify lang=xml?-->
    <bean id="multipartResolver"
        class="org.springframework.web.multipart.commons.CommonsMultipartResolver">
        <!-- <property name="maxUploadSize"value="100000"/> //不符合大小要求，服务器将抛出异常，我们更希望友好的提示用户-->
    </bean>

###### 解析上传的文件
基于注解的控制器中，`@RequestParam("sayiFile") MultipartFile file`这样的参数就可以获取到上传的文件了。通过MultipartFile可以获得更多有关文件的信息。  

<!--?prettify lang=java?-->
    String getName();  获取表单的文件控件名称
    String getOriginalFilename();  获取上传文件的名称
    String getContentType(); 
    boolean isEmpty(); 
    long getSize();
    InputStream getInputStream() throws IOException;
    void transferTo(File dest) throws IOException, IllegalStateException;


