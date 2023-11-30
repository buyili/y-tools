[npm&node版本那些事儿](https://juejin.cn/post/7153655986702516260)

npm版本控制
安装npm包时，版本前符号的含义：

*：使用任意版本
^x.y.z：x 位与指定版本一致，y、z 位使用最新版本
~x.y.z：x和y位与指定版本一致，z位使用最新版本
x.y.z和@x.y.z：x、y 和z全部锁死，使用指定的版本

升级版本相关的npm指令

升级主版本号：npm version major
升级次版本号：npm version minor
升级修订版本号：npm version patch
更新指定的包：npm update 包的名称

作者：Yiler
链接：https://juejin.cn/post/7153655986702516260
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。