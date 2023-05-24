FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install -g browser-sync

CMD ["browser-sync", "start", "--server", "--files", "**/*"]

EXPOSE 3000