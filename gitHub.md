# 张治国
<!-- GitHub上操作 -->
1、新建GitHub仓库
<!-- 本地操作 -->
2、拷贝"create-react-app"基础文件
3、config目录下dev里插件引用复制到prod里，并删除掉postcss-preset-env插件部分
<!--  -->
4、运行git add .
   运行git commit . -m "项目初始化开始"
5、拷贝git remote add origin git@github.com:zhangzhiguo010/WeChat-2018.git
   拷贝git push -u origin master
<!--  -->
6、运行npm run build
7、添加"homepage" : "http://zhangzhiguo010.github.io/XXX/build/",
8、运行npm run build
9、运行npm install --save-dev gh-pages
10、添加    
"scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
}
11、运行npm run deploy
<!--  -->
12、VSCode里远程更新GitHub仓库
// git add .
// git commit . -m "项目初始化完成"
// git push
<!-- GitHub上操作 -->
13、设置setting
14、添加链接：http://zhangzhiguo010.github.io/XXX/build/

