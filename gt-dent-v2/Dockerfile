FROM node:20.10.0-alpine

WORKDIR /Kofy-Back

COPY package*.json ./

RUN npm install

COPY . .

# RUN npx prisma generate

CMD ["sh", "-c", "npm run build && npm start"]

EXPOSE 3000