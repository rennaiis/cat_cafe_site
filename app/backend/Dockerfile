FROM node:20-alpine
WORKDIR /app/backend
COPY backend/package*.json ./
# RUN npm config set registry https://npm-mirror.gitverse.ru

RUN npm install

COPY backend/ .
COPY enums/ ../enums

EXPOSE 3000
CMD ["npx", "ts-node", "src/main.ts"]
