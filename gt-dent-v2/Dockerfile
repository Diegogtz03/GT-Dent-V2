FROM node:20.10.0-alpine

WORKDIR /GT-Dent-V2/gt-dent-v2

COPY package*.json ./

RUN npm config set registry http://registry.npmjs.org/

RUN npm cache clean --force

RUN npm install --verbose

COPY . .

# RUN npx prisma generate

CMD ["sh", "-c", "npm run build && npm start"]

EXPOSE 3000