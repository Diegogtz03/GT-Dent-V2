FROM node:18.17.0-alpine

WORKDIR /GT-Dent-V2/gt-dent-v2

COPY package*.json ./

RUN npm install --verbose

COPY . .

CMD ["sh", "-c", "npm run build && npm start"]
# CMD ["sh", "-c", "npm run dev"]

EXPOSE 3000