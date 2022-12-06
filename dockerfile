FROM node:16

WORKDIR /app

COPY package.json /app

RUN npm install --force

COPY . /app

RUN npm run build

ENV VITE_APP_API_URL="http://localhost:8080"

EXPOSE 80

CMD ["npm", "run", "preview"]