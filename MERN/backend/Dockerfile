#BASE IMAGE
FROM node:18.9.1
#SET WORKDIR
WORKDIR /app
#COPY pakg.json for npm installation
COPY package.json /app
#install packages
RUN npm install 
#EXPOSE PORT FOR server
EXPOSE 5050
#copy files 
COPY . .
#start app
CMD ["npm","run","start"]