FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

FROM base AS dev
EXPOSE 5173
EXPOSE 24678
CMD [ "npm", "run", "dev", "--", "--host" ]

FROM base AS prod
RUN npm run build
EXPOSE 3000
CMD [ "npm", "run", "start" ]