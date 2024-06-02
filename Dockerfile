FROM node:18-alpine

WORKDIR /home/app

ARG SERVICE_HOST
ENV SERVICE_HOST=$SERVICE_HOST

COPY ./node-service node-service
COPY ./react-frontend react-frontend

RUN cd /home/app/react-frontend \
    && npm install \
    && npm run build \
    && cp -r /home/app/react-frontend/build/* /home/app/node-service/public/ \
    && cd /home/app/node-service \
    && npm install \
    && npm run build

WORKDIR /home/app/node-service

EXPOSE 3000

CMD ["node", "./dist/app.js"]