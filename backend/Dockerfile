FROM node:20

WORKDIR /app

COPY package*.json /app/

RUN npm install 

COPY . /app/

RUN npx prisma generate

RUN npx prisma migrate dev

EXPOSE 3333

CMD [ "npm", "run", "dev" ]