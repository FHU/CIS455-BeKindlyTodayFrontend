FROM node:21-alpine AS base
WORKDIR /app
COPY ./package*.json .

ENV FRONTEND_PORT=${FRONTEND_PORT}
ENV VITE_KINDE_CLIENT_ID=${VITE_CLIENT_ID}
EXPOSE ${FRONTEND_PORT}

FROM base AS builder
ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_DOMAIN=${VITE_DOMAIN}
ENV VITE_NODE_ENV='production'

RUN npm ci

COPY . .
RUN npm run build


FROM nginx:alpine AS prod

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;" ]

FROM base AS dev
ENV VITE_NODE_ENV=development
ENV VITE_BACKEND_URL=${BACKEND_URL}
ENV VITE_DOMAIN=https://localhost:${FRONTEND_PORT}

RUN npm i
COPY . .
CMD [ "npm", "run", "dev" ]