# pull the base image
FROM node:alpine

# set the working direction
WORKDIR /teacher-app

# add `/teacher-app/node_modules/.bin` to $PATH
ENV PATH /teacher-app/node_modules/.bin:$PATH

# install teacher-app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install

# add teacher-app
COPY . ./

# start teacher-app
CMD ["npm", "start"]