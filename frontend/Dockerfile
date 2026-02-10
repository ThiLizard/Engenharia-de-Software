FROM node:20-alpine

WORKDIR /app

# copia apenas deps primeiro (cache do docker)
COPY package.json package-lock.json* ./

RUN npm install

# copia o restante do projeto
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]
