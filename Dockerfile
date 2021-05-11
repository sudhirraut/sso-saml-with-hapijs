###############################
FROM node:dubnium
ENV NODE_OPTIONS --max-old-space-size=2048
WORKDIR /app

#RUN apk --no-cache add g++ gcc libgcc libstdc++ linux-headers make python
#RUN npm install --quiet node-gyp -g

COPY ./package* ./
RUN ls -al
RUN npm install && \
    npm cache clean --force

COPY . .

EXPOSE 53746
# Start the app
CMD ["node", "index.js"]



###############################