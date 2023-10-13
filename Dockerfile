FROM node:lts-alpine as build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:lts-alpine AS production
WORKDIR /app
COPY --from=build /app/build .
EXPOSE 3000
CMD ["node", "."]
