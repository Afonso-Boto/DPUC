## 

Requirements

- NodeJS


## Setup 

### Run ReactJS Web app

In /teacher-app directory

```
npm install

npm start
```

### Run json-server

In /json-server directory

```
npx json-server --watch .\db.json --port 8000
```





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
