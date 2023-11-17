
# Back-End
### 서비스 목록
- api-gateway service
- discovery service
- member-service
- forest-service
- common-service
- notification-service

### build.gralde
```
buildscript {  
ext {  
queryDslVersion = "5.0.0"  
}  
}  
  
plugins {  
id 'java'  
id 'org.springframework.boot' version '2.7.17'  
id 'io.spring.dependency-management' version '1.0.15.RELEASE'  
id "com.ewerk.gradle.plugins.querydsl" version "1.0.10"  
}  
  
group = 'com.plantree'  
version = '0.0.1-SNAPSHOT'  
  
java {  
sourceCompatibility = '11'  
}  
  
configurations {  
compileOnly {  
extendsFrom annotationProcessor  
}  
}  
  
repositories {  
mavenCentral()  
}  
  
ext {  
set('springCloudVersion', "2021.0.8")  
}  
  
dependencies {  
// spring  
implementation 'org.springframework.boot:spring-boot-starter-web'  
implementation 'org.springframework.boot:spring-boot-starter-validation'  
  
// cloud  
implementation 'org.springframework.cloud:spring-cloud-starter-netflix-eureka-client'  
implementation 'org.springframework.boot:spring-boot-starter-actuator'  
  
// dev  
compileOnly 'org.projectlombok:lombok'  
annotationProcessor 'org.projectlombok:lombok'  
developmentOnly 'org.springframework.boot:spring-boot-devtools'  
annotationProcessor "org.springframework.boot:spring-boot-configuration-processor"  
  
// open feign  
implementation 'org.springframework.cloud:spring-cloud-starter-openfeign'  
  
// data  
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'  
runtimeOnly 'com.mysql:mysql-connector-j'  
  
// uuid  
implementation "com.fasterxml.uuid:java-uuid-generator:4.0.1"  
  
// test  
testImplementation 'org.springframework.boot:spring-boot-starter-test'  
  
// querydsl  
implementation "com.querydsl:querydsl-jpa:${queryDslVersion}"  
implementation "com.querydsl:querydsl-apt:${queryDslVersion}"  
  
// kafka  
implementation 'org.springframework.kafka:spring-kafka'  
  
//aws  
implementation 'io.awspring.cloud:spring-cloud-starter-aws:2.4.4'  
}  
  
dependencyManagement {  
imports {  
mavenBom "org.springframework.cloud:spring-cloud-dependencies:${springCloudVersion}"  
}  
}  
  
tasks.named('test') {  
useJUnitPlatform()  
}  
  
def querydslDir = "$buildDir/generated/querydsl"  
querydsl {  
jpa = true  
querydslSourcesDir = querydslDir  
}  
sourceSets {  
main.java.srcDir querydslDir  
}  
compileQuerydsl {  
options.annotationProcessorPath = configurations.querydsl  
}  
configurations {  
compileOnly {  
extendsFrom annotationProcessor  
}  
querydsl.extendsFrom compileClasspath  
}

```

## 서비스 별 설정파일(배포 환경)
### API-Gateway
```
server:

port: 8080

  

spring:

application:

name: apigateway-service

cloud:

gateway:

default-filters:

- DedupeResponseHeader=Access-Control-Allow-Origin Access-Control-Allow-Credentials

- name: AuthorizationFilter

globalcors:

cors-configurations:

'[/**]':

allowedOrigins: {배포서버}

allow-credentials: true

allowedHeaders: '*'

allowedMethods:

- PATCH

- GET

- POST

- DELETE

- OPTIONS

routes:

- id: member-service

uri: lb://MEMBER-SERVICE

predicates:

- Path=/member-service/**

filters:

- RewritePath=/member-service/(?<segment>.*), /$\{segment}

- id: forest-service

uri: lb://FOREST-SERVICE

predicates:

- Path=/forest-service/**

filters:

- RewritePath=/forest-service/(?<segment>.*), /$\{segment}

- id: common-service

uri: lb://COMMON-SERVICE

predicates:

- Path=/common-service/**

filters:

- RewritePath=/common-service/(?<segment>.*), /$\{segment}

- id: notification-service

uri: lb://NOTIFICATION-SERVICE

predicates:

- Path=/notification-service/**

filters:

- RewritePath=/notification-service/(?<segment>.*), /$\{segment}

  

eureka:

instance:

prefer-ip-address: true

instance-id: ${spring.application.name}:8080

client:

service-url:

defaultZone: http://discovery-service:8761/eureka/

register-with-eureka: true

fetch-registry: true

  
  

jwt:

access_key: {accessKey}

access_expired_minute: 30

refresh_key: {refreshKey}

refresh_expired_day: 14
```

## discovery-service
```
server:

port: 8761

  

spring:

application:

name: discovery-service

  

eureka:

client:

register-with-eureka: false

fetch-registry: false
```

## member-service
```
server:

port: 0

  

spring:

application:

name: member-service

datasource:

driver-class-name: com.mysql.cj.jdbc.Driver

username: root

url: jdbc:mysql://{서버 IP}:3306/plantree_db?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC

password: {DB Password}

jpa:

database: mysql

database-platform: org.hibernate.dialect.MySQL8Dialect

properties:

hibernate:

format_sql: 'true'

default_batch_fetch_size: 1000

show-sql: 'true'

hibernate:

ddl-auto: none

defer-datasource-initialization: true


eureka:

instance:

prefer-ip-address: true

instance-id: ${spring.application.name}:${spring.application.instance_id:${random.value}}

client:

service-url:

defaultZone: http://{서버 IP}:8761/eureka

fetch-registry: true

register-with-eureka: true

  
  

jwt:

access_key: {accessKey}

access_expired_minute: 30

refresh_key: {refreshKey}

refresh_expired_day: 14

  

kakao:

iss: https://kauth.kakao.com

aud: {aud}

admin_key: {admin_key}

  

google:

iss: https://accounts.google.com

aud: {aud}

admin_key: {admin_key}

```

## forest-service
```
server:

port: 0

  

spring:

application:

name: forest-service

datasource:

driver-class-name: com.mysql.cj.jdbc.Driver

username: root

url: jdbc:mysql://{서버 IP}:3306/plantree_db?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC

password: {DB Password}

jpa:

database: mysql

database-platform: org.hibernate.dialect.MySQL8Dialect

properties:

hibernate:

format_sql: 'true'

show-sql: 'true'

hibernate:

ddl-auto: none

defer-datasource-initialization: true

  

kafka:

bootstrap-servers-config: {서버 IP}:9092

default-topic: plantree-topic

  

eureka:

instance:

prefer-ip-address: true

instance-id: ${spring.application.name}:${spring.application.instance_id:${random.value}}

client:

service-url:

defaultZone: http://{서버 IP}:8761/eureka

fetch-registry: true

register-with-eureka: true
```
## common-service
```
server:

port: 0

  

spring:

application:

name: common-service

datasource:

driver-class-name: com.mysql.cj.jdbc.Driver

username: root

url: jdbc:mysql://{서버 IP}:3306/plantree_db?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC

password: {DB Password}

jpa:

database: mysql

database-platform: org.hibernate.dialect.MySQL8Dialect

properties:

hibernate:

format_sql: 'true'

show-sql: 'true'

hibernate:

ddl-auto: create-drop

defer-datasource-initialization: true

kafka:

bootstrap-servers-config: {서버 IP}:9092

default-topic: plantree-topic

  

eureka:

instance:

prefer-ip-address: true

instance-id: ${spring.application.name}:${spring.application.instance_id:${random.value}}

client:

service-url:

defaultZone: http://{서버 URL}:8761/eureka

fetch-registry: true

register-with-eureka: true

  

cloud:

aws:

s3:

bucket: plantree-bucket

credentials:

access-key: {accessKey}

secret-key: {secretKey}

region:

static: ap-northeast-2

stack:

auto: false
```

## notification-service
```
server:

port: 0

  

spring:

application:

name: notification-service

datasource:

driver-class-name: com.mysql.cj.jdbc.Driver

username: root

url: jdbc:mysql://{서버 IP}:3306/plantree_db?useSSL=false&characterEncoding=UTF-8&serverTimezone=UTC

password: {DB Password}

jpa:

database: mysql

database-platform: org.hibernate.dialect.MySQL8Dialect

properties:

hibernate:

format_sql: 'true'

default_batch_fetch_size: 1000

show-sql: 'true'

hibernate:

ddl-auto: create-drop

defer-datasource-initialization: true

redis:

host: {서버 IP}

port: 6379

  

kafka:

bootstrap-servers-config: {서버 IP}:9092

group-id-config: kafkaGroup

  

fcm:

credential: plantree-403223-firebase-adminsdk-s6qrd-d816af4da3.json

  

eureka:

instance:

prefer-ip-address: true

instance-id: ${spring.application.name}:${spring.application.instance_id:${random.value}}

client:

service-url:

defaultZone: http://{서버 URL}:8761/eureka

fetch-registry: true

register-with-eureka: true

  
  

jwt:

access_key: {accessKey}

access_expired_minute: 30

refresh_key: {refreshKey}

refresh_expired_day: 14
```

## 서비스 별 Dockerfile / docker-compose.yml
### API-Gateway
Dockerfile
```
FROM  openjdk:11-jdk

ARG  JAR_FILE=apigateway-service-0.0.1-SNAPSHOT.jar

COPY  ${JAR_FILE}  apigateway-service-0.0.1-SNAPSHOT.jar

  

ENTRYPOINT  ["java","-jar",  "apigateway-service-0.0.1-SNAPSHOT.jar"]

EXPOSE  8080
```
docker-compose
```
version: "3.7"

  

services:

api-gateway:

image: api-gateway-service

container_name: api-gateway-service

build:

context: .

dockerfile: Dockerfile

ports:

- "8080:8080"

networks:

- msa-network

  

networks:

msa-network:

external: true
```

## discovery-service
Dockerfile
```
FROM  openjdk:11-jdk

ARG  JAR_FILE=discovery-service-0.0.1-SNAPSHOT.jar

COPY  ${JAR_FILE}  discovery-service-0.0.1-SNAPSHOT.jar

  

ENTRYPOINT  ["java","-jar",  "discovery-service-0.0.1-SNAPSHOT.jar"]

  

EXPOSE  8761
```

docker-compose.yml
```
version: "3.7"

  

services:

discovery-service:

image: discovery-service

container_name: discovery-service

build:

context: .

dockerfile: Dockerfile

ports:

- "8761:8761"

networks:

- msa-network

  

networks:

msa-network:

external: true
```

## member-service
Dockerfile
```
FROM  openjdk:11-jdk

ARG  JAR_FILE=member-service-0.0.1-SNAPSHOT.jar

COPY  ${JAR_FILE}  member-service-0.0.1-SNAPSHOT.jar

  

ENTRYPOINT  ["java","-jar",  "member-service-0.0.1-SNAPSHOT.jar"]

  

EXPOSE  8081
```

docker-compose.yml
```
version: "3.7"

  

services:

member-service:

image: member-service

container_name: member-service

build:

context: .

dockerfile: Dockerfile

ports:

- "8081:8080"

networks:

- msa-network

  

networks:

msa-network:

external: true
```

## forest-service
Dockerfile
```
FROM  openjdk:11-jdk

ARG  JAR_FILE=forest-service-0.0.1-SNAPSHOT.jar

COPY  ${JAR_FILE}  forest-service-0.0.1-SNAPSHOT.jar

  

ENTRYPOINT  ["java","-jar",  "forest-service-0.0.1-SNAPSHOT.jar"]

  

EXPOSE  8082
```

docker-compose.yml
```
version: "3.7"

  

services:

forest-service:

image: forest-service

container_name: forest-service

build:

context: .

dockerfile: Dockerfile

ports:

- "8082:8080"

networks:

- msa-network

  

networks:

msa-network:

external: true
```

## common-service
Dockerfile
```
FROM  openjdk:11-jdk

ARG  JAR_FILE=common-service-0.0.1-SNAPSHOT.jar

COPY  ${JAR_FILE}  common-service-0.0.1-SNAPSHOT.jar

  

ENTRYPOINT  ["java","-jar",  "common-service-0.0.1-SNAPSHOT.jar"]

  

EXPOSE  8083
```

docker-compose.yml
```
version: "3.7"

  

services:

common-service:

image: common-service

container_name: common-service

build:

context: .

dockerfile: Dockerfile

ports:

- "8083:8080"

networks:

- msa-network

  

networks:

msa-network:

external: true
```

## notification-service
Dockerfile
```
FROM  openjdk:11-jdk

ARG  JAR_FILE=notification-service-0.0.1-SNAPSHOT.jar

COPY  ${JAR_FILE}  notification-service-0.0.1-SNAPSHOT.jar

  

ENTRYPOINT  ["java","-jar",  "notification-service-0.0.1-SNAPSHOT.jar"]

  

EXPOSE  8084
```

docker-compose.yml
```
version: "3.7"

  

services:

notification-service:

image: notification-service

container_name: notification-service

build:

context: .

dockerfile: Dockerfile

ports:

- "8084:8080"

networks:

- msa-network

  

networks:

msa-network:

external: true
```

# DB
- MySQL
- Kafka
- Redis

## MySQL
- EC2 서버에 설치
- db명 : plantree_db

## Kafka
docker-compose
```
version: '2'

services:

zookeeper:

image: wurstmeister/zookeeper

container_name: zookeeper

ports:

- "2181:2181"

networks:

- msa-network

  

kafka:

image: wurstmeister/kafka:2.12-2.5.0

container_name: kafka

ports:

- "9092:9092"

environment:

KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://52.78.194.181:9092

KAFKA_LISTENERS: PLAINTEXT://0.0.0.0:9092

KAFKA_ADVERTISED_HOST_NAME: 52.78.194.181

KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181

volumes:

- /var/run/docker.sock:/var/run/docker.sock

networks:

- msa-network

  

networks:

msa-network:

external: true
```

## redis
```
version: '3'

  

services:

redis:

image: "redis:latest"

container_name: redis

ports:

- "6379:6379"

networks:

- msa-network

  

networks:

msa-network:

external: true
```

# Nginx 설정
- certBot을 통한 SSL 인증서 발급 필요

sites-enabled/default
```
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    return 301 https://$host$request_uri;
}

server {
        listen 443 ssl default_server;
        listen [::]:443 ssl default_server;
        ssl_protocols TLSv1.2 TLSv1.3;

        ssl_certificate /etc/letsencrypt/live/k9a302a.p.ssafy.io/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/k9a302a.p.ssafy.io/privkey.pem;

        root /var/www/html;
        index index.html index.htm index.nginx-debian.html;
        server_name k9a302a.p.ssafy.io;

        location / {
                proxy_pass http://k9a302a.p.ssafy.io:3000;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_set_header Host $http_host;
        }

        location /api/ {
            proxy_pass http://k9a302a.p.ssafy.io:8080/;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header Host $http_host;
        }
}
```

# Front-End

install
```
$ cd frontend
$ npm install
```

develop server
```
$ npm run dev
```

build
```
$ npm run build
```

.env
```
VITE_PUBLIC_KAKAO_CLIENT_ID = {client_id}
VITE_PUBLIC_KAKAO_CLIENT_SECRET = {secret}

VITE_PUBLIC_GOOGLE_CLIENT_ID = {client_id}
VITE_PUBLIC_GOOGLE_CLIENT_SECRET = {secret}

# BASE
VITE_PUBLIC_CLIENT_BASE_URL = https://k9a302a.p.ssafy.io/
VITE_PUBLIC_SERVER_BASE_URL = https://k9a302a.p.ssafy.io/

# FIREBASE
VITE_PUBLIC_FIREBASE_API_KEY = {API_KEY}
VITE_PUBLIC_FIREBASE_AUTH_DOMAIN = {AUTH_DOMAIN}
VITE_PUBLIC_FIREBASE_PROJECT_ID = {PROJECT_ID}
VITE_PUBLIC_FIREBASE_STORAGE_BUCKET = {STORAGE_BUCKET}
VITE_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = {SENDER_ID}
VITE_PUBLIC_FIREBASE_APP_ID = {APP_ID}
VITE_PUBLIC_FIREBASE_MEASUREMENT_ID = {MEASUREMENT_ID}
VITE_PUBLIC_FIREBASE_VAPID_ID = {VAPID_ID}
```

Dockerfile
```
FROM node:latest as builder

WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx:latest
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

docker-compose
```
version: "3.7"

services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile
      #volumes:
    ports:
      - "3000:80"                                 
```

conf/conf.d/default.conf
```
server {
    listen 80;

    location / {
        root   /usr/share/nginx/html;
        index  index.html index.htm;
        try_files $uri $uri/ /index.html;
    }

    error_page   500 502 503 504  /50x.html;

    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
```

file tree generator
```
│  .eslintrc.cjs
│  .gitignore
│  .prettierrc
│  firebase-messaging-sw.js
│  index.html
│  package-lock.json
│  package.json
│  postcss.config.js
│  README.md
│  Scene.jsx
│  tailwind.config.js
│  tsconfig.json
│  tsconfig.node.json
│  vite.config.ts
│  
├─public
└─src
    │  App.scss
    │  App.tsx
    │  firebase.ts
    │  index.css
    │  main.tsx
    │  router.tsx
    │  vite-env.d.ts
    │  
    ├─apis
    │  │  apiConfig.ts
    │  │  index.ts
    │  │  
    │  ├─communication
    │  │      
    │  ├─forest
    │  │      
    │  ├─member
    │  │      
    │  └─notification
    │          
    ├─components
    │  │   
    │  ├─Branch
    │  │      
    │  ├─Button
    │  │      
    │  ├─Charts
    │  │  │  
    │  │  ├─BarChart
    │  │  │      
    │  │  ├─DoughnutChart
    │  │  │      
    │  │  └─PieChart
    │  │          
    │  ├─ForestCard
    │  │   
    │  ├─OIDC
    │  │      
    │  ├─Quest
    │  │      
    │  ├─SideBar
    │  │      
    │  ├─SignUp
    │  │      
    │  ├─Tree
    │  │  │  
    │  │  └─models
    │  │          
    │  └─Tutorial
    │          
    ├─pages
    │  │  Home.tsx
    │  │  index.ts
    │  │  LoadingPage.tsx
    │  │  MainPage.tsx
    │  │ 
    │  ├─ForestDetailPage
    │  │      
    │  ├─ForestPage
    │  │      
    │  ├─GroupPage
    │  │      
    │  ├─LoginPage
    │  │      
    │  ├─Mypage
    │  │    
    │  ├─NotFound
    │  │
    │  ├─NoticePage
    │  │          
    │  ├─StudentPage
    │  │    
    │  ├─SignupPage
    │  │    
    │  └─TreePage
    │          
    ├─stores
    │  │  provider.tsx
    │  │  selectors.ts
    │  │  store.ts
    │  │  
    │  ├─features
    │  │      
    │  └─services
    │          
    ├─styles
    │          
    ├─types
    │      
    └─utils
```

기술 스택

<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white">
<img src="https://img.shields.io/badge/redux-764ABC?style=for-the-badge&logo=redux&logoColor=white">
<img src="https://img.shields.io/badge/redux_saga-999999?style=for-the-badge&logo=reduxsaga&logoColor=white">
<img src="https://img.shields.io/badge/three.js-000000?style=for-the-badge&logo=threedotjs&logoColor=white">
<img src="https://img.shields.io/badge/sass-CC6699?style=for-the-badge&logo=sass&logoColor=white">
<img src="https://img.shields.io/badge/tailwind_css-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white">
<img src="https://img.shields.io/badge/vite-646CFF?style=for-the-badge&logo=vite&logoColor=white">
<img src="https://img.shields.io/badge/axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white">
<img src="https://img.shields.io/badge/OpenID-F78C40?style=for-the-badge&logo=openid&logoColor=white">
