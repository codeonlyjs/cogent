FROM node:latest

WORKDIR /usr/src/app/website
COPY client ./client/
COPY server ./server/
COPY package* ./

# Uncommenting the following line can speed up
# npm install significantly.
# RUN npm config set strict-ssl false
RUN npm install --omit=dev --loglevel verbose

EXPOSE 3000
ENTRYPOINT [ "/bin/sh", "-c" , "node ./server/server.js" ]
