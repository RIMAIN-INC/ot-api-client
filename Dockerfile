FROM node:18-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm install
COPY . .
EXPOSE 3000
ENV VITE_ROOT_URL = "http://localhost:8080"
CMD [ "npm", "run", "dev" ]

