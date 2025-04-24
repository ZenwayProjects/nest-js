FROM node:18-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install

ARG SERVICE

RUN npm run build --workspace=$SERVICE

FROM node:18-alpine AS runner

WORKDIR /app

ARG SERVICE

COPY --from=builder /app/dist/apps/$SERVICE /app/dist/apps/$SERVICE
COPY --from=builder /app/dist/libs /app/dist/libs
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

EXPOSE 3000

CMD ["node", "dist/apps/${SERVICE}/main.js"]
