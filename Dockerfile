FROM node:24-alpine

WORKDIR /app

# Copier uniquement le front
COPY front/package*.json ./
RUN npm install

COPY front ./

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host"]