FROM node

WORKDIR /src/usr

COPY . .

EXPOSE 5000

RUN npm install
RUN npm run build

CMD ["npm", "start"]