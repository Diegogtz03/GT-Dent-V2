FROM node:18-alpine

WORKDIR /GT-Dent-V2/gt-dent-v2

COPY package*.json ./

COPY node_modules ./node_modules

RUN npm install --unsafe-perm --verbose

COPY . .

# RUN npx prisma generate

CMD ["sh", "-c", "npm run build && npm start"]

EXPOSE 3000