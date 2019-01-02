##     打造属于自己的脚手架工具

-   减少重复性的工作，不再需要复制其他项目再删除无关代码。
-   根据交互动态生成项目结构和配置文件。
-   多人协作更方便。


### 初始化

``` 新建prohub-cli
    cd prohub-cli 
    npm init -y
```
新建`index.js`并写入以下内容
```1. #!/user/bin/env node 
    console.log('hello word')
```

配置`package.json`中的bin字段:
```
"bin": {
        "prohub": "index.js"
    }
```

执行`npm link `链接命令到全局
执行`bin`中配置的命令测试

例如：
```
prohub
```
输出如下内容:
```
prohub-cli 脚手架
```
### 命令行工具参数设计

```
    1.  pro -h|--help           查看使用帮助
    2.  pro -V|--version  查看工具版本号
    3.  pro --list           列出所有可用模版
    4.  pro init <template-name> <project-name>  基于指定的模板进行项目初始化
    5.


```

### 使用commander 模块处理命令行
安装：
```
npm install  commander
```



### 正确
```
 pro init tpl-1   options
```

### 视觉美化
```
const ora = require('ora')
const chalk = require('chalk')
const logSymbols = require('log-symbols')

```
这三个引入的包都是为了让prohub-cli在下载的时候好看一些。
有下载时候的图标和文字。

###  npm发包

```
npm i -g prohub-cli
```

1.打开`npmjs.com`官网			
2.注册一个npm账号。	        	
3.发包。在npm检索是否有重名的包名	             	
4.在`package.json`中的`name`修改为发布到npm上的包名               
5.打开控制台，执行 `npm login`,在控制台登陆npm, 输入用户名和密码，邮箱。                
6.此时npm的网址必须是原网址，淘宝镜像不可以哦。              
7.接下来`npm publish`就可以了。不过需要过十几分钟才能看到，更新不是及时的。              



