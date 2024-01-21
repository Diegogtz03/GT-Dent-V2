FROM node:20.10.0-alpine

WORKDIR /gt-dent-v2

COPY package*.json ./

RUN npm install --verbose

COPY . .

# RUN npx prisma generate

CMD ["sh", "-c", "npm run build && npm start"]

EXPOSE 3000