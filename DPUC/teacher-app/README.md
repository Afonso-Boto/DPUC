## 

Through docker-compose
```
$ docker-compose -f docker.compose.yml build
$docker run -p 3030:3030 --name teacher-app teacherapp
```


Through Dockerfile
```
$ docker build -t ps-container:dev .

$ docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true ps-container:dev --name teacher-app teacherapp
```
