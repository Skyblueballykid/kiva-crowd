FROM mhart/alpine-node:13 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

FROM mhart/alpine-node:13
RUN yarn global add serve
WORKDIR /app
COPY --from=builder /app/build .
CMD ["serve", "-p", "80", "-s", "."]
