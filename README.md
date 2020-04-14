# 技术选型
前端项目技术栈
Vue
Vue-router
Element-UI
Axios
Echarts

# 后端项目技术栈
Node.js

Express

Jwt

Mysql

Sequelize
接口地址（https://github.com/leetspeaks/vueShop-api-server）

# 项目初始化
前端项目初始化步骤
安装 Vue 脚手架
通过 Vue-Cli 创建项目
配置 Vue-router
配置 Element-UI 组件库
配置 Axios 库
初始化 git 远程仓库

# 后端项目的环境安装配置
安装MySQL数据库
安装Node.js环境
配置项目相关信息
启动项目
使用phpstudy导入数据库并运行
npm init 后端项目
node ./app.js
使用Postman测试后台项目接口是否正常

# 登录业务流程
在登录页面输入用户名和密码
调用后台接口进行验证
通过验证之后,根据后台的响应状态跳转到项目主页
登录业务相关技术点
http是无状态的
通过cookie在客户端记录状态
通过sesion在服务器端记录状态
通过token维持状态(不允许跨域使用)

# 登录页面的布局
通过Element-UI组件实现布局
el-form
el-form-item
el-input
el-button
字体图标

# 主页布局
通过接口获取菜单数据
通过axios请求拦截器添加token,保证拥有获取数据的权限

# 权限管理
权限管理业务分析
通过权限管理模块控制不同的用户可以进行哪些操作,具体可以通过角色的方式进行控制,即每个用户分配一个特定的角色,角色包括不同的功能权限

# 分类管理
商品分类概述
商品分类用于在购物时,快速找到需要购买的商品,进行直观显示

# 参数管理
参数管理概述
商品参数用于显示商品的特征信息,可以通过电商平台详情页面直观的看到

# 参数管理
参数管理概述
商品参数用于显示商品的特征信息,可以通过电商平台详情页面直观的看到

# vue-element-project

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
