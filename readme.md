## 0. 写在前面
nginx + vue + node + postgresql
两个镜像
```
ccr.ccs.tencentyun.com/node_test/vue_test_3 # vue + nginx
ccr.ccs.tencentyun.com/node_test/vue_express_3 # express + postgresql
```
[https://github.com/liuzemei/docker-node-postgres-vue-nginx](https://github.com/liuzemei/docker-node-postgres-vue-nginx)


## 1. 安装 docker

### 1. 安装
```shell
yum install -y yum-utils device-mapper-persistent-data lvm2
sudo yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
yum install -y docker-ce --nobest
systemctl start docker
systemctl enable docker
```

### 2. 换源
- (阿里云容器镜像服务)[https://cr.console.aliyun.com/]
- (腾讯云镜像服务)[https://cloud.tencent.com/document/product/1207/45596]

```shell
vim /etc/docker/daemon.json
```
```vim
{
"registry-mirrors": [
  "https://mirror.ccs.tencentyun.com"
],
"insecure-registries" : [
  "https://ccr.ccs.tencentyun.com"
]
}
```shell
systemctl restart docker
```




## 2. 安装 docker-compose
```shell
yum install -y epel-release
yum install -y python3-pip
pip3 install docker-compose
docker-compose --version
```
### docker-compose 文件编写
```yml
version: '3'
services:
  postgres:
    image: postgres:latest
    restart: always
    environment:
      POSTGRES_PASSWORD: postgres
      PGDATA: /var/lib/postgresql/data/pgdata
    volumes:
      - /home/postgres/data:/var/lib/postgresql/data/pgdata
  backend:
    image: ccr.ccs.tencentyun.com/node_test/vue_express_3
    restart: always
    depends_on:
     - postgres
  proxy:
    image: ccr.ccs.tencentyun.com/node_test/vue_test_3
    restart: always
    ports:
     - 80:80
    depends_on:
     - backend
    volumes:
     - /home/nginx/logs:/var/log/nginx
```

## 3. 运行容器
```shell
docker-compose up -d
```

## 4. 结束
可以直接去访问自己的端口了。已经部署好了nginx代理前后端，后端连接了postgres数据库。


