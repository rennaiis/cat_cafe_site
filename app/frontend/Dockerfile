FROM node:20-alpine
WORKDIR /app/frontend
COPY frontend/package*.json ./
# RUN npm config set registry https://npm-mirror.gitverse.ru

RUN npm install

COPY frontend/ .
COPY enums/ ../enums

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
