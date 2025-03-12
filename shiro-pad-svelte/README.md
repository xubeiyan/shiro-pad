# Shiro Pad

Shiro来自于《玉响未来》的女主小伯白(Kohaku Shiro)，也是“白”之意。也就阐明了这个项目是个白板应用。

## 使用技术

使用`Svelte`前端框架，配合全栈脚手架`SvelteKit`开发，UI框架使用了`Skeleton`。数据库使用`SQLite`。

## 使用方法

* 克隆本仓库的`master`分支至`shiro-pad`文件夹，并进入`shiro-pad/shiro-pad-svelte`文件夹

```bash
$ git clone --depth=1 https://github.com/xubeiyan/shiro-pad 
$ cd shiro-pad/shiro-pad-svelte
```

* 从`.env.example`复制，新建`.env.production`文件，并进行编辑，调整数据库地址

```bash
$ cp .env.example .env.production
$ vim .env.production
```

* 使用`db/create_db.sql`生成`sqlite`类型的数据库，和上一步保持一致

	> 使用`sqlite3`命令举例，生成路径为`./db/prod.db`

```bash
$ mkdir db
$ sqlite3 ./db/prod.db < ./db/create_db.sql
```

* 进行生产环境安装和打包，这里使用的包管理器为`pnpm`，其余类似

```bash
$ pnpm i

# linux shell
$ pnpm run build

# or windows cmd
$ pnpm run build
```

* 上述命令会生成`bulid`文件夹，执行

```bash
$ node build/index.js
```

* 浏览器访问`http://yourip:yourport/`即可看到（实际使用还需参考下面的部署方法）

## 部署方法

使用的是`SvelteKit`中的`node-adapter`模板进行部署，如需要不在项目文件夹（例如`/opt/shiro-pad`）部署，有两种方式

1. 复制`node_modules`

	* 复制生成的`build`文件夹, `package.json`, `db`文件夹以及`node_modules`文件夹至`/opt/shiro-pad`

		> 假设当前工作目录为`shiro-pad/shiro-pad-svelte`

		```bash
		$ cp -r build/ package.json db/ node_modules/ /opt/shiro-pad
		```

	* 启动项目，可以使用例如`pm2`和`forever`之类的进程管理，方便进行持续集成

		> 默认端口为 `3000`, 可在启动时指定环境变量 `PORT=9000` 修改至 `9000` 端口

		> 而 SvelteKit 的 `adapter-node` 要求需要 `ORIGIN` 参数，以避免 `Cross-site POST form submissions are forbidden` 的错误

		> 参见 https://kit.svelte.dev/docs/adapter-node#environment-variables-origin-protocolheader-hostheader-and-port-header

		> 下面的例子中是用的https://shiropad.mea.moe


		```bash
		$ ORIGIN=https://shiropad.mea.moe \
		> NODE_ENV=production \
		> node build/index.js
		```
	
2. 如果部署的位置复制大量文件不便，可以不复制`node_modules`，改由从`pnpm install`命令生成
	
	* 用`build`文件夹，`package.json`, `pnpm-lock.yaml`和`db`文件夹，打包生成`dist.tar`
	
		> 假设当前工作目录为`shiro-pad/shiro-pad-svelte`
		
		```bash
		$ tar -cf dist.tar build/ db/ package.json pnpm-lock.yaml
		```
	
	* 复制生成的`dist.tar`至目标目录
	* 假设`dist.tar`已经复制到`/opt/shiro-pad`，进行解包
	
		> 假设当前工作目录为`/opt/shiro-pad`
		
		```bash
		$ tar -xf dist.tar
		```
	
	* 没有问题后可以删除`dist.tar`（可选）
	
		```bash
		$ rm dist.tar
		```
	
	* 执行`pnpm`安装依赖命令，重新生成`node_modules`
	
		```bash
		$ pnpm i --prod
		```
	
	* 启动项目
	
		```bash
		$ ORIGIN=https://shiropad.mea.moe \
		> NODE_ENV=production \
		> node build/index.js
		```

	* （额外）可以使用例如`pm2`和`forever`之类的进程管理，方便进行持续集成，下面是 `shiropad.mea.moe` 上的 `pm2` 配置文件 `ecosystem.config.js`

		```javascript
		module.exports = {
			apps : [{
				name: "shiropad",
				script: "build/index.js",
				cwd: "/opt/shiro-pad/",
				env: {
					"NODE_ENV": "production",
					"ORIGIN": "https://shiropad.mea.moe",
				}
			}],
		}
		```
	
## 更新日志

### ver 1.2.0

**2024.09.22** 增加了通过神秘代码访问粘贴内容

### ver 1.1.1

**2024.06.14** 使用了单独引入 `highlight.js` 的高亮模块，减少了打包大小