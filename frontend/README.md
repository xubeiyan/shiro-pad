# Shiro Pad

Shiro来自于《玉响未来》的女主小伯白(Kohaku Shiro)，也是“白”之意。也就阐明了这个项目是个白板应用。

## 使用技术

使用`Svelte`前端框架，配合全栈脚手架`SvelteKit`开发，UI框架使用了`Skeleton`。数据库使用`SQLite`。

## 使用方法

* 克隆本仓库的`master`分支至`shiro-pad`文件夹，并进入`frontend`文件夹

```bash
git clone --depth=1 https://github.com/xubeiyan/shiro-pad 
cd shiro-pad/frontend
```

* 从`.env.example`复制，新建`.env.production`文件，并进行编辑，调整端口和数据库地址

```bash
cp .env.example .env.production
vim .env.production
```

* 进行生产环境安装和打包，这里使用的包管理器为`pnpm`，其余类似

```bash
pnpm i --prod
pnpm run build
```

* 上述命令会生成`bulid`文件夹，进入该文件夹，执行

```bash
node index.js
```