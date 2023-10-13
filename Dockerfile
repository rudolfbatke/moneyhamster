#source https://www.programonaut.com/how-to-create-a-docker-image-for-your-node-application-e-g-sveltekit/

FROM node:lts-alpine as build
WORKDIR /app
COPY ./package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM node:lts-alpine AS production
WORKDIR /app
COPY --from=build /app/build .
EXPOSE 3000
CMD ["node", "."]
