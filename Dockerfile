FROM node:21-alpine as base
WORKDIR /app
COPY ./package*.json .

ENV FRONTEND_PORT=${FRONTEND_PORT}
ENV VITE_KINDE_CLIENT_ID=${VITE_CLIENT_ID}
EXPOSE ${FRONTEND_PORT}

FROM base as builder

RUN npm ci

COPY . .
RUN npm run build


FROM base as prod

ENV VITE_BACKEND_URL=${VITE_BACKEND_URL}
ENV VITE_DOMAIN=${VITE_DOMAIN}
ENV VITE_NODE_ENV='production'

RUN addgroup react && adduser -S -G react react

USER react

USER root
RUN chown -R react:react . 

USER react

COPY --from=builder /app .

CMD [ "npm", "run", "preview" ]

FROM base as dev
ENV VITE_ENVIROMENT=dev
ENV VITE_BACKEND_URL=${BACKEND_URL}
ENV VITE_DOMAIN=https://localhost:${FRONTEND_PORT}

RUN npm i
COPY . .
CMD [ "npm", "run", "dev" ]