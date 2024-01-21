FROM node:20.10.0

WORKDIR /GT-Dent-V2/gt-dent-v2

COPY package*.json ./

RUN npm install

COPY . .

# RUN npx prisma generate

CMD ["sh", "-c", "npm run build && npm start"]

EXPOSE 3000