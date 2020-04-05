# Build steps
FROM node:lts-alpine AS builder

# use ARG to set environment API_HOST or default value at build time
ARG API_HOST=http://localhost:5000
ENV REACT_APP_API=$API_HOST

WORKDIR /app
COPY . .
RUN yarn install
RUN yarn run build

# Run steps
FROM node:lts-alpine
RUN yarn global add serve

WORKDIR /app
COPY --from=builder /app/build .

## add the wait script to the image
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.7.3/wait /wait
RUN chmod +x /wait

## launch the wait tool and then application
ENTRYPOINT /wait && serve -p 80 -s .
