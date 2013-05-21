## Apache Maven  
> In a nutshell Maven is an attempt to apply patterns to a project's build infrastructure in order to promote comprehension and productivity by providing a clear path in the use of best practices.  
> Maven is inherently project-centric in that everything revolves around the notion of a project.  

Maven,在Yiddish语言中，意味着知识的积累，最早是用来在Jakarta Turbine项目中试图简化构建过程。如果有若干个项目，每个项目都包含着稍微不同的ant构建文件，并且版本库中存放着的jar包，因此我们需要一种标准的方式去构建项目，一个对项目构成的清晰定义，一种简便的方式发布项目信息和一种途径在若干项目中分享jars包。  
最终Maven可以用来构建和管理任何基于Java的项目，我们希望我们创造了一些东西可以使java开发者每天工作的更简便，并且帮助他们更好的理解他们的项目。  

Maven的主要目标是让开发人员在最短的时间内理解开发工作的完整状态，为了实现这个目标，有几点需要去解决：  
* 使构建过程更容易  
* 提供统一的构建系统  
* 提供优质的项目信息  
* 提供最佳实践的指导  
* 允许透明的迁移到新特性  

#### 使构建过程更容易
虽然使用Maven并没有消除对机器底层的认知，但是maven屏蔽了许多细节。 
#### 提供统一的构建系统
Maven允许项目使用项目对象模型POM和一系列所有项目共享的插件，提供统一构建的系统。一旦你熟悉一个Maven项目如何建立，你就知道所有的Maven项目的构建，这会在浏览许多项目时节省很多时间。

#### 提供优质的项目信息
Maven提供了许多有用的项目信息，部分来自于项目POM，部分来自项目源码。比如，可以提供如下信息：  
* 更改直接从原来控制创建的日志文档
* 交叉引用来源
* 邮件列表
* 依赖列表
* 单元测试报告，包括覆盖  

#### 提供最佳实践的指导
Maven的目的是收集当前的最佳实践发展的原则，并可以很容易地在那个方向引导项目。  
例如，单元测试规范，执行和报告是正常的建设周期使用Maven的一部分。作为指导当前单元测试的最佳实践：

> 保持你的测试源代码，在一个单独的，但并行源代码树
> 使用命名约定来查找并执行测试的测试用例
> 测试用例设置各自的环境和不依赖于定制生成测试准备。

Maven也旨在协助项目的工作流程，如发布管理和问题跟踪。  
Maven还提出了一些指导如何布置你的项目的目录结构，所以，一旦你了解的布局，您可以轻松地浏览任何其他项目使用Maven和相同的默认值。  

## The Maven Integration for Eclipse 
