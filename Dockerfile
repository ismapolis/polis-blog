FROM node:20-alpine
WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto (excepto content, que será volumen)
COPY . .

EXPOSE 4321

# Por defecto usamos modo dev para que sea editable
CMD ["npm", "run", "dev", "--", "--host"]
